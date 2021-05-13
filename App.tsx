import { CHANNEL_NAME } from '@/constants/env';
import styles from '@/constants/styles/base';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View } from 'react-native';
import RtcEngine from 'react-native-agora';
import RemoteVideoPreview from '@/components/RemoteVideoPreview';
import getAgoraEngine from './utils/getAgoraEngine';
import HeartReactions from '@/components/HeartReactions';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import heartItems from '@/components/HeartReactions/_state/heartItems';
import addRandomHeart from '@/components/HeartReactions/_actions/addRandomHeart';
import getUserToken, { Token } from './utils/getUserToken';

const App: React.FC = () => {
  const [, setHeartItems] = useRecoilState(heartItems);
  const [user, setUser] = useState<Token>({ token: '', uid: 0 });
  const [channelName] = useState<string>(CHANNEL_NAME); // Use this to generate token on Agora dashboard
  const [joinSucceed, setJoinSucceed] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<number[]>([]);
  const AgoraEngine = useRef<RtcEngine>();

  const endCall = useCallback(async function endCall() {
    if (AgoraEngine.current) await AgoraEngine.current.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
  }, []);

  useEffect(() => {
    async function init() {
      setUser(await getUserToken());
      const client = await getAgoraEngine({
        getPeers: () => peerIds,
        onPeer: setPeerIds,
        onJoin: setJoinSucceed,
      });
      AgoraEngine.current = client;
    }
    // Setup client and get user info
    init();

    return () => {
      endCall();
    };
  }, []);

  const startCall = useCallback(
    function startCall() {
      AgoraEngine.current?.joinChannel(user.token, channelName, null, user.uid);
    },
    [user, channelName]
  );

  function addHeartReaction() {
    setHeartItems(addRandomHeart());
  }

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <RemoteVideoPreview
          show={joinSucceed}
          channelName={channelName}
          peers={peerIds}
        >
          <HeartReactions />
        </RemoteVideoPreview>
        <View style={styles.buttonHolder}>
          <Button onPress={startCall}>Start Call</Button>
          <Button onPress={endCall}>End Call</Button>
          <Button onPress={addHeartReaction}>Like</Button>
        </View>
      </View>
    </View>
  );
};

export default App;
