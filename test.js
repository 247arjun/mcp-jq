#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Test script for the MCP jq server
 */
async function testServer() {
  console.log("🧪 Testing MCP jq Server\n");

  // Test 1: Check if jq is installed
  try {
    await execAsync("which jq");
    console.log("✅ jq command found");
  } catch (error) {
    console.log("❌ jq command not found. Please install jq first.");
    console.log("   macOS: brew install jq");
    console.log("   Ubuntu: sudo apt-get install jq");
    return;
  }

  // Test 2: Test jq_format tool
  console.log("\n📋 Testing jq_format tool");
  try {
    const testJson = '{"name":"Alice","age":30,"skills":["JS","Python"]}';
    const { stdout } = await execAsync(`echo '${testJson}' | jq '.'`);
    console.log("✅ jq format test passed");
    console.log("   Input:", testJson);
    console.log("   Output:", stdout.trim());
  } catch (error) {
    console.log("❌ jq format test failed:", error);
  }

  // Test 3: Test jq_query functionality
  console.log("\n🔍 Testing jq_query functionality");
  try {
    const testData = '[{"name":"Alice","age":30},{"name":"Bob","age":25}]';
    const { stdout } = await execAsync(`echo '${testData}' | jq '.[].name'`);
    console.log("✅ jq query test passed");
    console.log("   Query: .[].name");
    console.log("   Result:", stdout.trim());
  } catch (error) {
    console.log("❌ jq query test failed:", error);
  }

  // Test 4: Test jq_query_file functionality
  console.log("\n📁 Testing jq_query_file functionality");
  try {
    const { stdout } = await execAsync("jq '.[] | select(.age > 28)' examples/users.json");
    console.log("✅ jq file query test passed");
    console.log("   Query: .[] | select(.age > 28)");
    console.log("   Result:", stdout.trim());
  } catch (error) {
    console.log("❌ jq file query test failed:", error);
  }

  console.log("\n🎉 All tests completed!");
  console.log("\n📚 Server is ready to use. Start with:");
  console.log("   npm start");
}

testServer().catch(console.error);
