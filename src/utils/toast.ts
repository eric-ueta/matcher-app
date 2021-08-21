import Snackbar from 'react-native-snackbar';

export default {
  showLong: (title: string) => {
    Snackbar.show({
      text: title,
      duration: Snackbar.LENGTH_LONG,
    });
  },
  showShort: (title: string) => {
    Snackbar.show({
      text: title,
      duration: Snackbar.LENGTH_SHORT,
    });
  },
  showIndefinite: (title: string) => {
    Snackbar.show({
      text: title,
      duration: Snackbar.LENGTH_INDEFINITE,
    });
  },
  showSuccess: (title: string) => {
    Snackbar.show({
      text: title,
      duration: Snackbar.LENGTH_LONG,
      textColor: 'white',
      backgroundColor: 'lime',
    });
  },
  showFail: (title: string) => {
    Snackbar.show({
      text: title,
      duration: Snackbar.LENGTH_LONG,
      textColor: 'white',
      backgroundColor: 'red',
    });
  },
  dismissAll: () => {
    Snackbar.dismiss();
  },
};
