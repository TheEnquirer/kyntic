import supabaseClient from './supabase'
import { useContext } from "react"
import moment from 'moment'


const db = (props) => {

    const fn = (f, name) => {
	db[name] = f
    }

    fn((m) => {
	console.log("whooo", m)
    }, "test")

    fn(() => {
	const user = supabaseClient.auth.user();
	return user;
    }, "getUser")

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

}

export default db;
