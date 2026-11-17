<p align="center">
  <img src="src/logo320.webp" width="150" alt="Pirate Token Claim All logo">
</p>

<h1 align="center">Pirate Token Claim All</h1>

<p align="center">
  <b>A Chrome and Edge extension for Fortnite</b><br>
  Claim every free item in the Fortnite Item Shop in one click with the Pirate Shop Access token.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge" alt="Chrome extension">
  <img src="https://img.shields.io/badge/Edge-Extension-0078D7?style=for-the-badge" alt="Edge extension">
</p>

<p align="center">
  <a href="https://github.com/Napzeee/fortnite-pirate-token-claim-all-extension/releases/latest/download/pirate-token-claim-all-extension.zip"><b>Download the extension</b></a> ·
  <a href="#install-the-extension">Install</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#faq">FAQ</a>
</p>

The Pirate Shop Access token (also called the Pirate Token or Item Shop Token) makes everything sold for V-Bucks in the Fortnite Item Shop free for 14 days, but every item still has to be claimed one by one. This browser extension claims all of them for you in one click. A full shop usually takes 20 to 30 seconds.

https://github.com/user-attachments/assets/5c0667a6-c0e3-4b4a-bf65-8775d96fb979

## Features
- One click claims every free skin, emote, pickaxe, bundle and jam track in the shop.
- Bundles are claimed first, so items that come with a bundle are never claimed twice.
- Only free items are claimed. V-Bucks are never spent.
- Shows how many free items you still don't own, right next to the Buy V-Bucks button.
- Tells you if you're signed out or the account doesn't have the token.
- Light and dark mode.

## Install the extension
1. Download the extension: **[pirate-token-claim-all-extension.zip](https://github.com/Napzeee/fortnite-pirate-token-claim-all-extension/releases/latest/download/pirate-token-claim-all-extension.zip)**, then unzip it (right-click > Extract All).
2. Open `chrome://extensions` (or `edge://extensions`) and turn on **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the unzipped folder.

To update, unzip the new version over the old folder and click the reload button on the extension card.

## Usage
1. Sign in at [fortnite.com/item-shop](https://www.fortnite.com/item-shop) with the account that has the token.
2. Click **Claim all free** next to the Buy V-Bucks button, or click the extension's icon in your browser toolbar and choose **Claim everything**.
3. When it finishes, click **Done**. The page reloads and every item shows as owned.

Press **Esc** or **Stop** at any time to stop claiming.

## Safety
- Claims use the same request as Epic's own Confirm button, always with an expected price of 0. Epic's servers reject any claim for an item that isn't actually free.
- Your V-Bucks balance is checked before and after every run.
- Everything runs locally in your browser on fortnite.com. Nothing is sent anywhere else, and the extension never sees your password.

## FAQ
**Is this a mod or a program I install on my PC?**
No. It's a browser extension for Chrome and Edge. It only runs on fortnite.com in your browser and never touches the game or the files on your PC.

**How do I claim everything in the Fortnite Item Shop at once?**
Activate your Pirate Shop Access token in game, add this extension to Chrome or Edge and click Claim all free in the web Item Shop.

**Does it work on mobile or consoles?**
The extension runs in desktop Chrome or Edge. Items claimed on fortnite.com show up on every platform you play on.

**What if my account doesn't have the token?**
Nothing is claimed. The extension shows a message explaining that the account has no active token.

## Source code
The extension's source code is in [`src`](src). You can also load that folder directly with **Load unpacked**.

---
Not affiliated with or endorsed by Epic Games. Fortnite is a trademark of Epic Games, Inc.
