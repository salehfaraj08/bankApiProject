import React from "react";
import axios from "axios";
import Student from "./student";


const Students = () => {
    const [students, setStudents] = React.useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:5001/").then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                setStudents(res.data);
            }
        });
    }, []);

    const deleteHandler = (id) => {
        let copyStudents = students.filter((student) => {
            return student._id !== id
        });
        setStudents(copyStudents);
        // setItems(items.filter(item => item.id !== id));
        console.log('success  :', id);
    }


    return (
        <div>
            {
                students && students.length > 0 ? students.map((student) => {
                    return <Student key={student._id} name={student.name} age={student.age} _id={student._id}
                        deleteStudent={deleteHandler} />
                }) : <div>Loading...</div>
            }
        </div>
    )

}

export default Students;