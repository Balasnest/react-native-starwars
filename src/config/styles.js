import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const colors = {
  "secondary": '#0686E4',
  "tertiary": '#ffffff',
  "background_dark": '#F0F0F0',
  "text_light": '#ffffff',
  "text_medium": '#464646',
  "text_dark": '#263238',
  "transparent_white": '#FFFFFF00',
  "separator_background": '#E2E2E2',
};
export const COLOR_PRIMARY  = '#fff';
export const FONT_MAIN   = 'ALGERIA';
export const FONT_NAME      = 'Verdana';
export const FONT_BOLD_SIZE = 32;
export const FONTSIZE_L     = 24;
export const FONTSIZE_M     = 18;
export const FONTSIZE_S     = 14;
export const buttonSize = {width: 154, height: 40, resizeMode: 'contain'}

export const smallPhone     = () => {
  if(width<=568)
    return true
  else
    return false
}