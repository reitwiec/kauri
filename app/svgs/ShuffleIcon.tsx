import {View} from 'react-native';
import { Path, Svg } from 'react-native-svg';

export const ShuffleIcon = ({color}) => {
  if(!color){
    color = "#fff"
  }
  return (
    <View style={{aspectRatio: 24/27}}>
      <Svg width="100%" height="100%" viewBox="0 0 24 27" fill="none">
        <Path fillRule="evenodd" clipRule="evenodd" d="M23.5382 6.97036C23.8574 6.72782 24.0116 6.40031 23.9993 6.07443C23.9983 5.75491 23.8375 5.43873 23.5201 5.20738C23.4798 5.17806 23.4381 5.15083 23.395 5.12568L18.5117 1.10943C17.927 0.628567 16.9644 0.610075 16.3617 1.06812C15.759 1.52617 15.7444 2.28731 16.329 2.76817L18.8629 4.8521C16.0409 5.09664 14.1107 6.0519 12.7572 7.55063C11.8876 8.51364 11.3112 9.65451 10.8697 10.7872C10.4281 9.65451 9.85182 8.51364 8.98216 7.55063C7.4004 5.79907 5.03084 4.78981 1.37071 4.78981C0.61369 4.78981 4.18306e-06 5.4035 4.18306e-06 6.16052C4.18306e-06 6.91754 0.61369 7.53122 1.37071 7.53122C4.49557 7.53122 6.02738 8.36899 6.94758 9.38797C7.93628 10.4828 8.41105 11.9608 9.01223 13.8322L9.05587 13.9681C9.16605 14.3108 9.281 14.6662 9.40642 15.0285C8.99071 16.0578 8.50089 16.9351 7.77123 17.6466C6.68561 18.7052 4.87294 19.566 1.37071 19.566C0.613686 19.566 0 20.1797 0 20.9367C0 21.6937 0.613686 22.3074 1.37071 22.3074C5.33196 22.3074 7.92954 21.3212 9.68513 19.6093C10.1468 19.1591 10.536 18.6708 10.8697 18.1618C11.2034 18.6708 11.5926 19.1591 12.0543 19.6093C13.5707 21.088 15.7153 22.0253 18.8244 22.2532L16.3126 24.4072C15.738 24.9 15.7681 25.6609 16.3799 26.1068C16.9916 26.5527 17.9534 26.5147 18.5281 26.0219L23.4163 21.8299C23.4583 21.8042 23.499 21.7764 23.5382 21.7466C23.8574 21.5041 24.0116 21.1766 23.9993 20.8507C23.9983 20.5312 23.8375 20.215 23.5201 19.9836C23.4798 19.9543 23.4381 19.9271 23.395 19.9019L18.5117 15.8857C17.927 15.4048 16.9644 15.3863 16.3617 15.8444C15.759 16.3024 15.7444 17.0636 16.329 17.5444L18.6972 19.4921C16.2608 19.2621 14.8659 18.522 13.9682 17.6466C13.2385 16.9351 12.7487 16.0578 12.333 15.0285C12.4584 14.6662 12.5733 14.3108 12.6835 13.9681L12.7272 13.8322C13.3283 11.9608 13.8031 10.4828 14.7918 9.38797C15.5241 8.57705 16.6438 7.8809 18.6454 7.63042L16.3126 9.63093C15.738 10.1237 15.7681 10.8847 16.3799 11.3306C16.9916 11.7765 17.9534 11.7384 18.5281 11.2456L23.4163 7.05369C23.4583 7.02792 23.499 7.00015 23.5382 6.97036Z" fill={color}/>
      </Svg>
    </View>
  );
};
