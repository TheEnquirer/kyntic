import supabaseClient from './supabase'
import { useContext } from "react"
import moment from 'moment'
import GlobalContext from '../utils/global-context'
import { decode } from 'base64-arraybuffer'
import { useRouter } from "next/router"


const db = (props) => {
    //console.log(
    //global.

    //let cache = false

    const fn = (f, name) => {
	db[name] = f
    }

    fn(async (e) => {
	if (e) console.log(e)
	if (e == {message: 'JWT expired'}) { db.signOut() }
    }, "checkErrors")

    fn((m) => {
	console.log("whooo", m)
    }, "test")

    fn(() => {
	const user = supabaseClient.auth.user(); // TODO: make this stuff cache
	return user;
    }, "getUser")

    fn(async () => {
	const { error } = await supabaseClient.auth.signOut()
    }, "signOut")

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

	//if (error || !data) {
	//    console.log(error)
	//}
	db.checkErrors(error)

	if (!data) {
	    return false
	}

	let toEdit = data.filter((i) => {
	    let g = moment(i.created_at)
	    let current = moment().startOf('day');
	    return g.isSame(current, 'day')
	})

	if (toEdit.length == 0) { return false }
	else { return toEdit[0] }

    }, "getTodaysData")

    fn(async (dates) => {
	const { data, error } = await supabaseClient
	    .from('data')
	    .select()

	db.checkErrors(error)
	data.sort((a, b) => {
	    return -moment(a.created_at).diff(moment(b.created_at))
	})

	let rangedData = data.filter((i) => {
	    return (moment(i.created_at).isAfter(dates[0]) && moment(i.created_at).isBefore(dates[1]))
	})

	return rangedData

    }, "getDataFromRange")

    fn(async (dataObject) => {

	const { data, error } = await supabaseClient
	    .from('data')
	    .select()

	db.checkErrors(error)

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
	    db.checkErrors(error)
	} else {
	    // update the old object
	    const { data, error } = await supabaseClient
		.from('data')
		.update([
		    { user_id: db.getUser().id, debug: "updated object", ...dataObject }
		])
		.match({ created_at: toEdit[0].created_at })
	    db.checkErrors(error)
	}

    }, "logData")

    fn(async (dataObject) => {
	const { data, error } = await supabaseClient
	    .from('users')
	    .update({ id: db.getUser().id, ...dataObject })
	//if (error) console.log(error)
	db.checkErrors(error)
    }, "setUserData")

    fn(async () => {
	const { data, error } = await supabaseClient
	    .from('users')
	    .select()

	db.checkErrors(error)

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

	/**
	 * Upload gyro and accel data to supabase database.
	 * File must be a b64 string.
	 */
	fn(async(fileName, file) => {
		const { data, error } = await supabaseClient
			.storage
			.from('data')
			.upload(`${supabaseClient.auth.user().id}/${fileName}`, decode(file), {
				cacheControl: '3600', // I think this keeps it in the cache for an hour... probs don't want that
				upsert: true
			})
		db.checkErrors(error)
		return error
	}, "uploadData")
}

export default db;
