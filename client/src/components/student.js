import React from "react";
import axios from "axios";

const Student = ({ name, _id, age, deleteItem }) => {
    const [student, setStudent] = React.useState({
        name,
        age,
        _id,
    });
    //get=> url
    //post = > body
    //put => url+body

    const deleteHandler = () => {
        axios.delete(`http://localhost:7001/store/delete/${student._id}`)
            .then((res) => {
                if (res.status === 200) {
                    deleteItem(student._id)
                }
                else {
                    alert("Something went wrong")
                }
            })
    }

    return <div>
        <>
            name : {student.name}
            ,age : {student.age}
            <input type={'button'} value={'delete'} onClick={deleteHandler} />
        </>
    </div>
}

export default Student;