import Image from 'next/image';
import Card from '../ui/Card';

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
import Notifications from './Notifications';
import { useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import { getHomeItems } from '../../store/selectors';
import Store from '../../store';
import pageStyles from '../../styles/Pages.module.css';

{/*const FeedCard = ({ title, type, text, author, authorAvatar, image }) => (
  <Card className="mx-auto my-4">
    <div className="relative w-full h-32">
      <Image className="rounded-t-xl" objectFit="cover" src={image} alt="" layout='fill' />
    </div>
    <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
      <h4 className="py-0 font-bold text-gray-400 uppercase text-s dark:text-gray-500">{type}</h4>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
      <p className="my-3 mr-1 text-gray-500 sm:text-sm text-s dark:text-gray-400">{text}</p>
      <div className="flex items-center space-x-4">
        <div className="relative w-10 h-10">
          <Image layout='fill' src={authorAvatar} className="rounded-full" alt="" />
        </div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-200 m-l-8">{author}</h3>
      </div>
    </div>
  </Card>
);*/}

const Log = () => {
  const homeItems = Store.useState(getHomeItems);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <IonPage>
      {/*<IonHeader>*/}
        <IonToolbar>
	  <IonTitle>
	      <div className={pageStyles.title}> log </div>
	      <hr className={pageStyles.sep}/>
	  </IonTitle>
          {/*<IonButtons slot="start">*/}
            {/*<IonMenuButton />*/}
          {/*</IonButtons>*/}
          {/*<IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>*/}
        </IonToolbar>
      {/*</IonHeader>*/}
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
	    <IonTitle size="large">log</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*<Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />*/}
        {/*{homeItems.map((i, index) => (
          <FeedCard {...i} key={index} />
        ))}*/}
	  {/*gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted. gutted.*/}
      </IonContent>
    </IonPage>
  );
};

export default Log;
