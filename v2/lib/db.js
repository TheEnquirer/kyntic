import supabaseClient from './supabase'
import { useContext } from "react"
import moment from 'moment'


const db = (props) => {

    //let cache = false

    const fn = (f, name) => {
	db[name] = f
    }

    fn((m) => {
	console.log("whooo", m)
    }, "test")

    fn(() => {
	const user = supabaseClient.auth.user(); // TODO: make this stuff cache
	return user;
    }, "getUser")

    fn((m) => {
	//cache = m
    }, "updateCache")

    fn(() => {
	//console.log(cache)
    }, "checkCache")

    fn(async () => {
	const { data, error } = await supabaseClient
	    .from('data')
	    .select()

	if (error || !data) { console.log(error) }

	let toEdit = data.filter((i) => {
	    let g = moment(i.created_at)
	    let current = moment().startOf('day');
	    return g.isSame(current, 'day')
	})

	if (toEdit.length == 0) { return false }
	else { return toEdit[0] }

    }, "getTodaysData")

    fn(async (dataObject) => {

	const { data, error } = await supabaseClient
	    .from('data')
	    .select()

	if (error) {
	    console.log(error)
	}

	let toEdit = data.filter((i) => {
	    let g = moment(i.created_at)
	    let current = moment().startOf('day');
	    return g.isSame(current, 'day')
	})

	if (toEdit.length === 0) {
	    // push a new log object
	    const { data, error } = await supabaseClient
		.from('data')
		.insert([
		    { user_id: db.getUser().id, debug: "new object", ...dataObject }
		])
	} else {
	    // update the old object
	    const { data, error } = await supabaseClient
		.from('data')
		.update([
		    { user_id: db.getUser().id, debug: "updated object", ...dataObject }
		])
		.match({ created_at: toEdit[0].created_at })
	}

    }, "logData")

    fn(async (dataObject) => {
	const { data, error } = await supabaseClient
	    .from('users')
	    .update({ id: db.getUser().id, ...dataObject })
	if (error) console.log(error)
    }, "setUserData")

    fn(async () => {
	const { data, error } = await supabaseClient
	    .from('users')
	    .select()

	if (error) console.log(error)

	if (!data || data.length == 0) {
	    const obj = {
		id: db.getUser().id,
		activitieOptions: [
		    { title: 'school' },
		    { title: 'reading' },
		],
		workoutOptions: [
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
		]
	    }
	    const { data, error } = await supabaseClient
		.from('users')
		.insert([ obj ])
	    return obj
	} else {
	    return data[0]
	}

    }, "getUserData")
}

export default db;
