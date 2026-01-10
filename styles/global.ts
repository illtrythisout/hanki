import { StyleSheet } from 'react-native';
import { colors, spacing, radii, fontSizes, fonts } from './theme';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-start',
    flexDirection: 'column',

    gap: spacing.md,
    padding: spacing.lg,

    backgroundColor: colors.background,
  },
  pageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
  },
  h2: {
    fontWeight: 'bold',
    fontSize: fontSizes.xl,
  },
});
