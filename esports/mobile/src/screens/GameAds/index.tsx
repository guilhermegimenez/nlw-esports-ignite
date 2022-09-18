
import { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Entypo } from '@expo/vector-icons';

import { styles } from './styles';
import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png'

import { AdProps } from '../../interfaces/AdProps';
import { GameProps } from '../../interfaces/GameProps';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { Ad } from '../../components/Ad';
import { AdMatch } from '../../components/AdMatch';


export function GameAds() {
  const [ads, setAds] = useState<AdProps[]>([]);
  const [discordAdSelected, setDiscordAdSelected] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameProps;


  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adId: string) {
    fetch(`http://192.168.0.204:3030/ads/${adId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordAdSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.0.204:3030/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setAds(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-left'
              color={THEME.COLORS.CAPTION_300}
              size={32} />
          </TouchableOpacity>
          <Image
            source={logoImg}
            style={styles.logo}
            resizeMode="cover"
          />
          <View style={styles.right} />
        </View>

        <Image
          style={styles.cover}
          source={{ uri: game.bannerUrl }} />

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!' />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Ad
              props={item}
              onConnect={() => { getDiscordUser(item.id) }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={[ads.length > 0 ? styles.contentList : styles.contentListEmpty]}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.empityList}>
              Não há anúncios publicados para esse jogos.
            </Text>
          )}
        />
        {/* {ads.map(ad => {
          return (
            <Ad
              key={ad.id}
              props={ad}
            />
          )
        })} */}
        <AdMatch
          visible={discordAdSelected.length > 0}
          discord={discordAdSelected}
          onClose={() => setDiscordAdSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}