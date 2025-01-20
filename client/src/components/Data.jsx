import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ContextData } from './context/context'
const Data = () => {
    const { loginData, setLoginData } = useContext(ContextData)
    const [resData, setResData] = useState(null)
    // console.log(resData)
    // console.log(loginData)
    const getData = async () => {
        const data = await fetch('http://localhost:3000/user',
            {
                method: "GET",
                credentials: 'include',
            }
        )
        const res = await data.json()
        setResData(res)
        // console.log(res)

    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {resData && resData.name &&
                <div>
                    <div>{resData.name.firstname}</div>
                    <div>{resData.name.lastname}</div>
                    <div>{resData.email}</div>
                </div>
            }
            {/* <div>
                {loginData && loginData.result.user.name &&
                    <div>
                        <div>{loginData.result.user.name.firstname}</div>
                        <div>{loginData.result.user.name.lastname}</div>
                        <div>{loginData.result.user.email}</div>
                    </div>
                }
            </div> */}
        </>
    )
}

export default Data
