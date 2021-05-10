import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

import requestCameraAndAudioPermission from './components/Permission';
import styles from './components/Style';

interface Props {}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
}

/**
 * Use APP ID from your Agora project
 * @see https://docs.agora.io/en/Agora%20Platform/token#a-name--appidause-an-app-id-for-authentication
 */
const AGORA_APP_ID = 'd119092f1efb4c06a84b32784b1f7153';

const App: FunctionComponent = () => {
  const AgoraEngine = useRef<RtcEngine>();

  /**
   * Generate temporary token generated on Agora dashboard (valid for 24 hours)
   * or create a lambda / firebase function for generating Token via API call
   * @see https://docs.agora.io/en/Agora%20Platform/token#3-generate-a-token
   */
  const [token] = useState<string>('006d119092f1efb4c06a84b32784b1f7153IADYE9305agRHAbgin4lTJFkDMfybHDFuq3d+i1+qbLCKpg7u+YAAAAAEADn5pQIfCSaYAEAAQB6JJpg');
  const [channelName] = useState<string>('testRoom'); // Use this to generate token on Agora dashboard
  const [joinSucceed, setJoinSucceed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [peerIds, setPeerIds] = useState<number[]>([]);

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  const init = async () => {
    // Request required permissions from Android
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }

    AgoraEngine.current = await RtcEngine.create(AGORA_APP_ID);
    await AgoraEngine.current.enableVideo();

    AgoraEngine.current.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    AgoraEngine.current.addListener('Error', (err) => {
      console.log('Error', err);
    });

    AgoraEngine.current.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        // Add peer ID to state array
        setPeerIds([...peerIds, uid]);
      }
    });

    AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      // Remove peer ID from state array
      setPeerIds(peerIds.filter((id) => id !== uid));
    });

    // If Local user joins RTC channel
    AgoraEngine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        // Set state variable to true
        setJoinSucceed(true);
        setLoading(false);
      }
    );
    setLoading(false);
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  const endCall = async () => {
    if (AgoraEngine.current) await AgoraEngine.current.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
  };

  useEffect(() => {
    init();
    return () => {
      endCall();
    };
  }, []);

  /**
   * @name startCall
   * @description Function to start the call
   */
  const startCall = async () => {
    // Join Channel using null token and channel name
    await AgoraEngine.current?.joinChannel(token, channelName, null, 0);
  };

  const renderVideos = () => {
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {renderRemoteVideos()}
      </View>
    ) : null;
  };

  const renderRemoteVideos = () => {
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  if (loading) {
    return null;
  }

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        {renderVideos()}
      </View>
    </View>
  );
};

export default App;
