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
	IonInput
} from '@ionic/react';
import { useState, useEffect, useContext } from 'react';
import pageStyles from '../../styles/Pages.module.css';
import Item from '../ui/Item';
import { useHistory } from 'react-router-dom';
import db from '../../lib/db'
import GlobalContext from '../../utils/global-context'
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';


const PasswordReset = () => {
    const [text, setText] = useState("");
    const router = useRouter()

    useEffect(() => {
	db();
    }, [])

    return (
	<IonPage class="plt-android plt-mobile md" mode="md">
	    <IonContent className="ion-padding" fullscreen>
		<div class="flex flex-col font-bold text-gray-700 justify-center align-center content-center text-center"><p class="mb-12">-- reset password --</p>

		{/*<IonInput class="text-black" value={text} placeholder="enter new password" onIonChange={e => setText(e.detail.value)}></IonInput>*/}
		    <TextField id="outlined-basic" label="new password"
			onChange={ e => setText(e.target.value) }
		    variant="outlined" />
		    <div class="bg-red-800 p-2 rounded text-gray-200 mt-5"
			onClick={() => {
			    console.log(text)
			    db.resetPassword(text, window.location.hash.split("&")[0].substring(14))
			    router.push(`/`)

			}}
		    > reset </div>
		</div>


	    </IonContent>
	</IonPage>
    );
};

export default PasswordReset;
