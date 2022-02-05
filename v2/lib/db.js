import supabaseClient from './supabase'
import { useContext } from "react"


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


	const { data, error } = await supabaseClient
	    .from('data')
	    .select()

	if (error) {
	    console.log(error)
	}

	console.log(data, "data")
    }, "logData")

}

export default db;
