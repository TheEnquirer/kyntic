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
      <div className="p-4 ml-4 mr-4 h-28 rounded-2xl" style={{backgroundColor: props.obj.color}}> 
	  <div className={itemStyles.title}>
	      {props.obj.title}
	  </div>
	  <div className={itemStyles.desc}>
	      <div className="flex flex-col">
		  {props.obj.desc}
		  <p><span className="font-extrabold">untracked</span> so far.</p>
	      </div>
	  </div>
      </div>
  );
};

export default Item;

