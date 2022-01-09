import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
} from '@ionic/react';
import { useState } from 'react';
import itemStyles from '../../styles/Item.module.css';


const Item = (props) => {
  return (
      <div className="p-4 pl-5 pr-5 ml-4 mr-4 h-28 rounded-2xl" style={{backgroundColor: props.obj.color}}> 
	  <div className={itemStyles.title}>
	      {props.obj.title}
	  </div>
	  <div className={itemStyles.desc}>
	      {props.obj.desc}
	  </div>
      </div>
  );
};

export default Item;

