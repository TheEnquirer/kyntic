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
	//console.log(db.getUser())

	//const { data, error } = await supabaseClient
	//    .from('data')
	//    .insert([
	//        { user_id: db.getUser().id }
	//    ])

	//var given = moment("2018-03-10", "YYYY-MM-DD");
	//var current = moment().startOf('day');

	//Difference in number of days


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
	console.log(toEdit)

	if (toEdit.length === 0) {
	    // push a new log object
	    const { data, error } = await supabaseClient
		.from('data')
		.insert([
		    { user_id: db.getUser().id, debug: "new object" }
		])
	} else {
	    const { data, error } = await supabaseClient
		.from('data')
		.update([
		    { user_id: db.getUser().id, debug: "updated object" }
		])
		.match({ created_at: toEdit[0].created_at })
	    //console.log(data, error, "returned")
	}

    }, "logData")

}

export default db;
