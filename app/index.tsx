// react
import { Text, View, StyleSheet } from 'react-native';
// styles
import { globalStyles } from '@/styles/global';
import { colors, spacing, fontSizes } from '../styles/theme';
// assets
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Index() {
  // fake data
  const data = {
    nCardsCompleted: 7,
    nTotalCards: 10,
  };

  return (
    <View style={globalStyles.screen}>
      {/* Header */}
      <View style={globalStyles.pageHeaderContainer}>
        <Text style={globalStyles.h2}>Hanki</Text>
        <MaterialIcons name="close" size={fontSizes.xl} color="#000000" />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Text
          style={styles.progressBarText}
        >{`${data.nCardsCompleted}/${data.nTotalCards}`}</Text>
        <View style={styles.progressBar}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    position: 'relative',
    paddingInline: spacing.sm,

    alignItems: 'flex-end',
    justifyContent: 'center',

    width: '100%',
    height: 32,

    borderRadius: 16,
    backgroundColor: colors.primaryFaded,
  },
  progressBar: {
    position: 'absolute',
    left: 0,

    width: '50%',
    height: '100%',

    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  progressBarText: {},
});
