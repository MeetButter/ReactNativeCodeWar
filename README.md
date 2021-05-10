# React Native Code War (Based on Agora)

This is a Code War Challenge based on [Agora](https://www.agora.io/en), which powers Butter's real-time video conference functionality. To proceed further, you are required to complete a few tasks below so we can evaluate your skillsets.

## Prerequisites

* `>=` react native 0.59.10
* iOS SDK 8.0+
* Android 5.0+
* A valid Agora account [Sign up](https://dashboard.agora.io/en/) for free.

Open the specified ports in [Firewall Requirements](https://docs.agora.io/en/Agora%20Platform/firewall?platform=All%20Platforms) if your network has a firewall.

## Tasks
This minimal App has the basic functionality to start a video conference call then join into it. It comes with a reaction functionality that local user can press `like` button in the call. This action will result in heart ♥️  animation being displayed to the local user only (you do not need to broadcast the `like` to remote participants - out of scope).

* First, follow instructions below to spin up the App with your own Agora account. (This task is to validate your experience with integrating 3rd party vendor)
* Then, integrate Redux and any Redux Middleware (thunk or saga) into this App for handling the side effects of `like` actions with Redux, move away from current local state implementation. (This task is to verify your knowledge with Redux and its middleware)
* You are free to improve the code logics, error handling and performance of the `like` functionality in the Redux Middleware. For example, debouncing the rendering of hearts ♥️ when `like` button is being pressed continuously. 
* See [`./App.tsx`](https://github.com/MeetButter/ReactNativeCodeWar/blob/master/App.tsx) for comments that mentioning the tasks.
* Create a Pull Request into this code repo and provide a recorded demo for us to evaluate your work. Otherwise a live demo of your work is expected later based on schedule when neccessary.
* You are advised to complete the tasks within 48 hours once this is assigned. Get back to us when your PR is ready :)

## Spinning up this App
### Generate an App ID

You need to use the App ID of your project. Follow these steps to [Create an Agora project](https://docs.agora.io/en/Agora%20Platform/manage_projects?platform=All%20Platformshttps://docs.agora.io/en/Agora%20Platform/manage_projects?platform=All%20Platforms#create-a-new-project) in Console and get an [App ID](https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#a-nameappidaapp-id).

1. Go to [Console](https://dashboard.agora.io/) and click the [Project Management](https://dashboard.agora.io/projects) icon on the left navigation panel. 
2. Click **Create** and follow the on-screen instructions to set the project name, choose an authentication mechanism (for this project select App ID without a certificate), and Click **Submit**. 
3. On the **Project Management** page, find the **App ID** of your project. 

Check the end of document if you want to use App ID with the certificate.

### Steps to spin up the App

* **PLEASE FORK THIS REPOSITORY**, then clone to your local environment.
* Run `npm install` or use `yarn` to install the app dependencies in the unzipped directory.
* Navigate to `./App.tsx` and enter your App ID that Agora generated as `AGORA_APP_ID=YourAppId,`
* The app uses `testChannel` as the channel name. Navigate to `./App.tsx` and update `CHANNEL_NAME` if you wish to change.
* Use `CHANNEL_NAME` above for [generating temporary token](https://docs.agora.io/en/Agora%20Platform/token#3-generate-a-token), then update `TEMP_TOKEN_ID` in `./App.tsx` for usage (valid for 24 hours). Otherwise, you may consider creating a backend endpoint to generate TOKEN_ID via API call (optional).
* Open a terminal and execute `cd ios && pod install`.
* Connect your device and run `npx react-native run-android` or `npx react-native run-ios` to start the app.
* Use actual mobile device for debugging in stead of simulator, it is to make sure you can use the camera feature. Otherwise configure your simulator to use your laptop/pc's camera.

### Structure

```
.
├── android
├── components
│ └── Heart.tsx
├── ios
├── App.tsx
├── index.js
.
```

## Sources
* Agora [API doc](https://docs.agora.io/en/)

## License
MIT
