import { AGORA_APP_ID } from '@/constants/env';
import { Platform } from 'react-native';
import RtcEngine from 'react-native-agora';
import requestCameraAndAudioPermission from './Permission';

type Props = {
  onPeer: (peers: Array<number>) => void;
  onJoin: (joinSucceed: boolean) => void;
  getPeers: () => Array<number>;
};

export default async function getAgoraEngine({
  onPeer,
  onJoin,
  getPeers,
}: Props) {
  if (Platform.OS === 'android') {
    requestCameraAndAudioPermission().then(() => {
      console.log('requested!');
    });
  }

  const AgoraEngine = await RtcEngine.create(AGORA_APP_ID);
  await AgoraEngine.enableVideo();

  AgoraEngine.addListener('Warning', (warn) => {
    console.log('Warning', warn);
  });

  AgoraEngine.addListener('Error', (err) => {
    console.log('Error', err);
  });

  AgoraEngine.addListener('UserJoined', (uid, elapsed) => {
    console.log('UserJoined', uid, elapsed);
    const peerIds = getPeers();
    if (peerIds.indexOf(uid) === -1) {
      onPeer([...peerIds, uid]);
    }
  });

  AgoraEngine.addListener('UserOffline', (uid, reason) => {
    console.log('UserOffline', uid, reason);
    const peerIds = getPeers();
    onPeer(peerIds.filter((id) => id !== uid));
  });

  AgoraEngine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
    console.log('JoinChannelSuccess', channel, uid, elapsed);
    onJoin(true);
  });

  return AgoraEngine;
}
