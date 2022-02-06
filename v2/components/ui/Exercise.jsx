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
import ExerciseBlock from "./ExerciseBlock";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import db from '../../lib/db'

const filter = createFilterOptions();


const TEST = [
    {
	name: "run",
	len: "30m",
	h: null,
	m: 30,
    },
    {
	name: "walk",
	len: "1h, 14m",
	h: 1,
	m: 14,
    },
    {
	name: "swim",
	len: "2h, 1m",
	h: 2,
	m: 1,
    },
    {
	name: "tennis",
	len: "30m",
	h: null,
	m: 30,
    },
]

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    //bgcolor: 'background.paper',
    bgcolor: '#f2e8e8',
    //border: '2px solid #000',
    borderRadius: "0.8rem",
    boxShadow: 24,
    p: 4,
    outline: "none",
    color: "white",
    fontWeight: "900",
};

let workoutOptions = [
    { title: "outdoor run" },
    { title: "indoor run" },
    { title: "outdoor walk" },
    { title: "indoor walk" },
    { title: "outdoor cycle" },
    { title: "indoor cycle" },
    { title: "swim" },
    { title: "yoga" },
    { title: "strength training" },
    { title: "soccer" },
    { title: "footbal" },
    { title: "tennis" },
    { title: "volleyball" },
    { title: "baseball" },
    { title: "basketball" },
    { title: "hiking" },
];

const reducer = (state, action) => {
    switch (action.type) {
	case 'append':
	    //return state.append(action.payload)
	    let newval = [action.payload, ...state]
	    action.props.setLoggingData("exercise", newval)
	    return newval
	case 'edit':
	    let localState = state
	    localState[action.i] = action.payload
	    action.props.setLoggingData("exercise", localState)
	    return localState
	case 'delete':
	    localState = state
	    localState.splice(action.i, 1)
	    action.props.setLoggingData("exercise", localState)
	    return localState
	    //case 'decrement':
	    //    return {count: state.count - 1};
	case 'reset':
	    return TEST;
	case 'set':
	    return action.payload
	default:
	    throw new Error();
    }
}

const Exercise = (props) => {


    const [workouts, manageWorkouts] = useReducer(reducer, [])
    const [modal, toggleModal] = useState(false)
    const [selectVal, setSelectVal] = React.useState(null);

    const [hourVal, setHourVal] = React.useState("");
    const [minVal, setMinVal] = React.useState("");
    const [isEditing, setEditing] = React.useState(false)

    const handleEdit = (i) => {
	setSelectVal({ title: workouts[i].name })
	console.log(workouts[i])
	setHourVal(workouts[i].h)
	setMinVal(workouts[i].m)
	setEditing([true, i])
	toggleModal(true)
    }

    const containsOption = (obj, list) => {
	let i;
	for (i = 0; i < list.length; i++) {
	    if (list[i].title === obj.title) {
		return true;
	    }
	}
	return false;
    }

    useEffect(() => {
	db();
	db.getTodaysData().then((e) => {
	    if (e !== false) {
		if (e.exercise) {
		    manageWorkouts({type: 'set', payload: e.exercise})
		}
	    }
	})
    }, [])

    return (
	<div className="w-screen h-screen border-0 border-red-500">
	    <svg viewBox="0 0 566 234" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M115 212.5C35.1088 193.637 12.9999 172.041 -2.50006 155.5L-2.5 5.65648e-05C-2.5 5.65648e-05 326.539 -1.47787 569.966 5.27501e-05V172.041C548.276 168.641 556.593 199.931 439 219C309.5 240 225 238.472 115 212.5Z" fill={props.color} fill-opacity="0.56"/> <path d="M127.981 182.586C45.8926 182.586 32.5 129.5 -5.00007 115.5C-5.0001 59.5 -5.00045 68.5 -5.00007 1.50003C-5.00001 -8.99996 321.5 1.50005 569 1.50003V132.984C573.785 128.775 576.651 125.613 577.855 124.18C578.726 123.002 578.763 123.099 577.855 124.18C576.578 125.907 573.51 130.374 569 138.5V132.984C553.951 146.222 519.911 169.82 458.835 182.586C325.192 210.518 230.59 182.586 127.981 182.586Z" fill={props.color} />
		<path d="M-5.00007 115.5C32.5 129.5 45.8926 182.586 127.981 182.586C230.59 182.586 325.192 210.518 458.835 182.586C575.444 158.213 593.5 94.3538 569 138.5V1.50003C321.5 1.50005 -5.00001 -8.99996 -5.00007 1.50003C-5.00045 68.5 -5.0001 59.5 -5.00007 115.5Z" stroke={props.color} /> </svg>

	    <div className={subStyles.emacs}>exercise</div>

	    <div className={subStyles.subtitle}>
		what exercise did you get today?
	    </div>
	    <div
		className={`flex flex-col items-center mt-5 text-center border-0 border-blue-500 h-3/5 overflow-scroll`}
		// TODO fix overlap w/ the done button!
	    > 
		<div className={subStyles.fullButton}
		    onClick={() => {
			//console.log("clikcking!")
			//manageWorkouts({type: 'reset', payload: "workout!"})
			//console.log(workouts)
			setEditing(false)
			toggleModal(true)
		    }}
		> 
		    + add a workout
		</div>
		{workouts.map((v, i) => {
		    return ( <ExerciseBlock name={v.name} idx={i} edit={handleEdit} len={ v.len } color={props.color}/> )
		})}
	    </div>
	    <Modal
		open={modal}
		onClose={() => {
		    setMinVal(null)
		    setHourVal(null)
		    setSelectVal(null)
		    toggleModal(false)
		}}
		closeAfterTransition
		BackdropComponent={Backdrop}
		BackdropProps={{
		    timeout: 500,
		}}
	    >
		<Fade in={modal}>
		    <Box sx={style}>
			<div className="flex flex-col">
			    {/*workout:
			    length: */}

			    <Autocomplete
				value={selectVal}
				onChange={(event, newValue) => {
				    if (typeof newValue === 'string') {
					setSelectVal({
					    title: newValue,
					});
				    } else if (newValue && newValue.inputValue) {
					// Create a new value from the user input
					setSelectVal({
					    title: newValue.inputValue,
					});
				    } else {
					setSelectVal(newValue);
				    }
				}}
				filterOptions={(options, params) => {
				    const filtered = filter(options, params);

				    const { inputValue } = params;
				    // Suggest the creation of a new value
				    const isExisting = options.some((option) => inputValue === option.title);
				    if (inputValue !== '' && !isExisting) {
					filtered.push({
					    inputValue,
					    title: `add "${inputValue}"`,
					});
				    }

				    return filtered;
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				id="free-solo-with-text-demo"
				options={workoutOptions}
				getOptionLabel={(option) => {
				    // Value selected with enter, right from the input
				    if (typeof option === 'string') {
					return option;
				    }
				    // Add "xxx" option created dynamically
				    if (option.inputValue) {
					//console.log("new thing!")
					return option.inputValue;
				    }
				    // Regular option
				    return option.title;
				}}
				renderOption={(props, option) => <li {...props}>{option.title}</li>}
				sx={{ width: 300 }}
				freeSolo renderInput={(params) => (
				    <TextField {...params} label="workout" />
				)}
			    />


			    <div className="flex flex-row mt-3 space-x-3"> 
				<TextField 
				    id="outlined-basic" placeholder="0" label="hours" variant="outlined" 
				    value={hourVal}
				    onChange={(e) => {
					console.log(e)
					setHourVal(e.target.value)
				    }}
				/>
				<TextField 
				    id="outlined-basic" placeholder="0" label="minutes" variant="outlined"
				    value={minVal}
				    onChange={(e) => {
					//console.log(e)
					setMinVal(e.target.value)
				    }}
				/>
			    </div>
			    <div className="flex flex-row w-full border-0 border-red-500 space-x-3">
				{isEditing? <div className="flex flex-col content-center justify-center w-full h-12 mt-3 mb-0 font-bold text-center align-middle bg-red-400 rounded-lg" 
				    onClick={() => {
					console.log("deletinnn")
					manageWorkouts({type: 'delete', i: isEditing[1], props: props})
					toggleModal(false)
					setMinVal(null)
					setSelectVal(null)
				    }}
				>
				    delete
				</div> : ""}
				<div className="flex flex-col content-center justify-center w-full h-12 mt-3 mb-0 font-bold text-center align-middle bg-blue-300 rounded-lg"
				    onClick={() => { 
					// validation checks!! TODO
					let localHour = hourVal;
					let localMin = minVal;

					if (localHour == "0") { 
					    //setHourVal(null) 
					    localHour = null;
					    console.log("hours are 0")
					}
					if (localMin == "0") { 
					    localMin = null;
					    //setMinVal(null)
					}
					if (( localMin == "" || localMin == null) && ( localHour == "" || localHour == null) ) { localMin = "1" }
					if (selectVal == null || selectVal == "") {
					    console.log("no title!!")
					    return
					}

					if (selectVal != null && !containsOption(selectVal, workoutOptions)) {
					    workoutOptions.push({ title: selectVal.title.toLowerCase() })
					}

					if (!isEditing) {
					    manageWorkouts({type: 'append', payload: { 
						name: selectVal.title.toLowerCase(),
						len: `${localHour? localHour+"h " : ""}${(localHour && localMin)? ", " : ""}${localMin? localMin+"m" : ""}`,
						m: localMin, 
						h: localHour,
					    }, props: props})
					} else {
					    manageWorkouts({type: 'edit', payload: { 
						name: selectVal.title.toLowerCase(),
						len: `${localHour? localHour+"h " : ""}${(localHour && localMin)? ", " : ""}${localMin? localMin+"m" : ""}`,
						m: localMin, 
						h: localHour,
					    }, i: isEditing[1], props: props}) //TODO some bug here where a space gets added after the comma?
					}


					toggleModal(false)

					setMinVal(null)
					setHourVal(null)
					setSelectVal(null)
					//console.log(workoutOptions)
					//console.log(workoutOptions.indexOf({ title: "indoor walk" }))
				    }}
				>
				    done
				</div>

			</div>

			</div>
		    </Box>
		</Fade>
	    </Modal>
	</div>
    );
}




export default Exercise;
