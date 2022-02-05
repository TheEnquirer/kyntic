import pageStyles from "../../styles/Pages.module.css"
import subStyles from "../../styles/Sub.module.css"
import { arrowBackOutline } from 'ionicons/icons';
import {
    IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonMenuButton,

} from '@ionic/react';
import { useHistory } from "react-router-dom";
import Slider from '@mui/material/Slider';
import ReactDOM from 'react-dom';
import { ReactComponent as GreenBlob } from '../../public/green_blob.svg';
import React, { useState, useRef, useEffect, useReducer } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';



const Activities = (props) => {
    const [activitieOptions, setActivitieOptions] = useState(starterOptions)
    //const [noteValue, setNoteValue] = useState({ target: {value: ""}})
    const [noteValue, setNoteValue] = useState({target: ""})

    return (
	<div className="w-screen h-screen border-0 border-red-500">
	    <svg viewBox="0 0 566 234" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M115 212.5C35.1088 193.637 12.9999 172.041 -2.50006 155.5L-2.5 5.65648e-05C-2.5 5.65648e-05 326.539 -1.47787 569.966 5.27501e-05V172.041C548.276 168.641 556.593 199.931 439 219C309.5 240 225 238.472 115 212.5Z" fill={props.color} fill-opacity="0.56"/> <path d="M127.981 182.586C45.8926 182.586 32.5 129.5 -5.00007 115.5C-5.0001 59.5 -5.00045 68.5 -5.00007 1.50003C-5.00001 -8.99996 321.5 1.50005 569 1.50003V132.984C573.785 128.775 576.651 125.613 577.855 124.18C578.726 123.002 578.763 123.099 577.855 124.18C576.578 125.907 573.51 130.374 569 138.5V132.984C553.951 146.222 519.911 169.82 458.835 182.586C325.192 210.518 230.59 182.586 127.981 182.586Z" fill={props.color} />
		<path d="M-5.00007 115.5C32.5 129.5 45.8926 182.586 127.981 182.586C230.59 182.586 325.192 210.518 458.835 182.586C575.444 158.213 593.5 94.3538 569 138.5V1.50003C321.5 1.50005 -5.00001 -8.99996 -5.00007 1.50003C-5.00045 68.5 -5.0001 59.5 -5.00007 115.5Z" stroke={props.color} /> </svg>

	    <div className={subStyles.emacs}>activities</div>

	    <div className={subStyles.subtitle}>
		what activities did you do today?
	    </div>
	    <div className="border-0 border-blue-500 ">
		<div className="m-4 mb-0 mt-7">
		    <Autocomplete

			onChange={(event, value, reason) => {
			    if (reason == "createOption") {
				setActivitieOptions([...activitieOptions, { title: value.at(-1) }])
			    }
			    props.setLoggingData("activities", value)
			}}

			sx={{
			    //background: "#ffffff",
			    //outline: "none"
			    //border: "1px solid red",
			    '& .MuiAutocomplete-endAdornment': {
				display: "none"
			    }
			}}
			multiple
			id="tags-filled"
			//options={activitieOptions.map((option) => option.title)}
			options={
			    activitieOptions.map((option) => option.title)
			}
			//defaultValue={[activitieOptions[13].title]}
			freeSolo
			renderTags={(value, getTagProps) =>
				value.map((option, index) => (
				    <Chip
					variant="filled"
					label={option}
					sx={{
					    border: "none",
					    background: props.color,
					    //color: "#5C5E61",
					    color: "white",
					    fontSize: "12px",
					    fontWeight: "900",
					}}
					{...getTagProps({ index })}
				    />
				))
			}


			renderInput={(params) => (
			    <TextField
				{...params}
				variant="outlined"
				label="activities"
				sx={{
				    //border: "1px solid red",
				    //outline: "none"
				    //marginRight: "1rem",
				    //marginLeft: "1rem"
				}}
				//placeholder="Favorites"
			    />
			)}
		    />
		</div>
		<div className="flex flex-col m-4 -mt-2 border-0 border-red-300">
		    <textarea
			type="text"
			value={noteValue.target.value}
			onChange={(e) => {
			    setNoteValue(e)
			    props.setLoggingData("notes", e.target.value)
			}}
			className={subStyles.noteBox}
			placeholder={"any notes about today?"}
		    />
		</div>
		<div className="h-screen border-0 border-red-500"> 
		</div>
	    </div>
	</div>
    );
}




export default Activities;





const starterOptions = [
    { title: 'school' },
    { title: 'reading' },
    { title: 'swimming' },
    { title: "uht-" },
];
