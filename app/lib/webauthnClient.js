"use client";
import { startRegistration, startAuthentication } from "@simplewebauthn/browser";
import { supabase } from "./supabaseClient";
import { completePasskeyLogin } from "./auth";

export async function registerPasskey(deviceName) {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData?.session?.access_token;
  if (!accessToken) {
    return { success: false, error: "You need to be signed in to register a device." };
  }

  const optionsRes = await fetch("/api/webauthn/register-options", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const options = await optionsRes.json();
  if (!optionsRes.ok) {
    return { success: false, error: options.error || "Could not start registration." };
  }

  let attResp;
  try {
    attResp = await startRegistration({ optionsJSON: options });
  } catch (err) {
    return { success: false, error: "Registration was cancelled or not supported on this device." };
  }

  const verifyRes = await fetch("/api/webauthn/register-verify", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ response: attResp, deviceName }),
  });
  const result = await verifyRes.json();
  if (!verifyRes.ok) {
    return { success: false, error: result.error || "Could not verify device." };
  }
  return { success: true };
}

export async function listPasskeys() {
  const { data } = await supabase
    .from("webauthn_credentials")
    .select("id, device_name, created_at")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function removePasskey(id) {
  await supabase.from("webauthn_credentials").delete().eq("id", id);
}

export async function loginWithPasskey() {
  const optionsRes = await fetch("/api/webauthn/login-options", { method: "POST" });
  const { options, sessionId } = await optionsRes.json();
  if (!optionsRes.ok) {
    return { success: false, error: "Could not start biometric sign-in." };
  }

  let assertion;
  try {
    assertion = await startAuthentication({ optionsJSON: options });
  } catch (err) {
    return { success: false, error: "Biometric sign-in was cancelled or isn't available on this device." };
  }

  const verifyRes = await fetch("/api/webauthn/login-verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, response: assertion }),
  });
  const result = await verifyRes.json();
  if (!verifyRes.ok) {
    return { success: false, error: result.error || "Could not verify. Please try again." };
  }

  const { error: otpError, data: otpData } = await supabase.auth.verifyOtp({
    token_hash: result.tokenHash,
    type: "email",
  });
  if (otpError || !otpData?.user) {
    return { success: false, error: "Could not sign you in. Please try again." };
  }

  return await completePasskeyLogin(otpData.user);
}
