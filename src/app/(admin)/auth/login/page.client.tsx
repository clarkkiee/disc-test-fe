"use client";
import * as React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { registerUser } from "@/services/UserActionServices";
import { useRouter } from "next/navigation";
import * as yup from "yup"
import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "@/services/AuthContext";
import { getExamSessionIdByUserId } from "@/services/ExamActionServices";

export interface BiodataFields {
  email: string;
  name: string;
  birthdate: string;
  latest_education: string;
  position_applied: string;
  domicile_city: string;
  source_information: string;
}

type entryExamSession = {
  userId: string;
  authorization: string;
  examSessionId: string;
}

const AdminLoginForm: React.FC<{}> = () => {

  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const [ loading, setLoading ] = useState<boolean>(false)

  const initialValues: BiodataFields = {
    email: "",
    name: "",
    birthdate: "",
    latest_education: "",
    position_applied: "",
    domicile_city: "",
    source_information: "",
  };

  const checkUserEntry = useCallback(async () => {
    if(currentUser){
      const examSession = await getExamSessionIdByUserId()
      if(!examSession){
        return
      } else {
        router.push(`/disc/${examSession}?question=1`)
      }
    }
  }, [currentUser, router]) 

  useEffect(() => {
    checkUserEntry()
  }, [checkUserEntry])

  const handleSubmit = async (values: BiodataFields) => {
    try {
      setLoading(true)
      const res : entryExamSession = await registerUser(values)
      const examSessionId = res.examSessionId
      if(!examSessionId || examSessionId === null || examSessionId === undefined){
        router.refresh()
      } else {
        router.push(`/disc/${examSessionId}?question=1`)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  };

  const BiodataValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    name: yup.string().required('Required'),
    birthdate: yup.string().required('Required'),
    latest_education: yup.string().required('Required'),
    position_applied:  yup.string().required('Required'),
    domicile_city: yup.string().required('Required'),
    source_information: yup.string().required('Required'),
  })

  return (
      <div className="flex flex-col w-full py-6 lg:px-[7%] justify-center items-center">
        {
          loading ? <div>Loading...</div> :
          <>
            <h1 className="font-semibold text-green-700 text-4xl my-2">Admin Login</h1>
            <div className="flex w-full">
              <Formik
                initialValues={initialValues}
                validationSchema={BiodataValidationSchema}
                onSubmit={(values, actions) => {
                  handleSubmit(values);
                  actions.setSubmitting(false);
                  actions.resetForm();
                }}
                
              >
                {({ values, errors, touched }) => (
                  <Form className="flex w-full flex-col gap-4 p-6">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Field className={`py-2 px-4 border-[1px] rounded-full ${ errors.email && touched.email ? 'border-red-500' : 'border-gray-300' } `} id="email" name="email" placeholder="Email" />
                        { errors.email && touched.email ? 
                          ( <div className="px-2 text-xs text-red-500">{errors.email}</div> ) : null
                        }
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="name">Nama lengkap</label>
                        <Field className={`py-2 px-4 border-[1px] rounded-full ${ errors.name && touched.name ? 'border-red-500' : 'border-gray-300' } `} id="name" name="name" placeholder="Nama Lengkap" />
                        { errors.name && touched.name ? 
                          ( <div className="px-2 text-xs text-red-500">{errors.name}</div> ) : null
                        }
                      </div>

                      <div className="flex gap-4 flex-col lg:flex-row">
                        <div className="flex basis-1/2 flex-col gap-1">
                          <label htmlFor="birthdate">Tanggal Lahir</label>
                          <Field
                            id="birthdate"
                            name="birthdate"
                            placeholder="Tanggal Lahir"
                            type="date"
                            className={`py-2 px-4 border-[1px] rounded-full ${ errors.birthdate && touched.birthdate ? 'border-red-500' : 'border-gray-300' }`}
                          />
                          { errors.birthdate && touched.birthdate ? 
                            ( <div className="px-2 text-xs text-red-500">{errors.birthdate}</div> ) : null
                          }
                        </div>

                        <div className="flex basis-1/2 flex-col gap-1">
                          <label htmlFor="domicile_city">Kota Domisili</label>
                          <Field
                            id="domicile_city"
                            name="domicile_city"
                            placeholder="Kota domisili "
                            className={`py-2 px-4 border-[1px] rounded-full ${ errors.domicile_city && touched.domicile_city ? 'border-red-500' : 'border-gray-300' }`}
                          />
                          { errors.domicile_city && touched.domicile_city ? 
                            ( <div className="px-2 text-xs text-red-500">{errors.domicile_city}</div> ) : null
                          }
                        </div>
                      </div>


                      <div
                        className="flex flex-col gap-1"
                        role="group"
                        aria-labelledby="my-radio-group"
                      >
                        <label>Pendidikan Terakhir</label>
                        <label className="flex items-center gap-2">
                          <Field
                            type="radio"
                            name="latest_education"
                            value="SMA / SMK / Sederajat"
                            className="flex appearance-none w-4 h-4 border-[1px] border-gray-600 checked:bg-green-700 checked:border-green-950 rounded-full"
                          />
                          <p>SMA / SMK / Sederajat</p>
                        </label>
                        <label className="flex items-center gap-2">
                          <Field className="flex appearance-none w-4 h-4 border-[1px] border-gray-600 checked:bg-green-700 checked:border-green-950 rounded-full" type="radio" name="latest_education" value="Diploma" />
                          <p>Diploma</p>
                        </label>
                        <label className="flex items-center gap-2">
                          <Field className="flex appearance-none w-4 h-4 border-[1px] border-gray-600 checked:bg-green-700 checked:border-green-950 rounded-full" type="radio" name="latest_education" value="Sarjana" />
                          <p>Sarjana</p>
                        </label>
                        <label className="flex items-center gap-2">
                          <Field className="flex appearance-none w-4 h-4 border-[1px] border-gray-600 checked:bg-green-700 checked:border-green-950 rounded-full" type="radio" name="latest_education" value="Lainnya" />
                          <p>Lainnya</p>
                        </label>
                        { errors.latest_education && touched.latest_education ? 
                          ( <div className="px-2 text-xs text-red-500">{errors.latest_education}</div> ) : null
                        }
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="position_applied">Posisi yang Dilamar</label>
                        <Field
                          id="position_applied"
                          name="position_applied"
                          placeholder="Posisi yang dilamar"
                          className={`py-2 px-4 border-[1px] rounded-full ${ errors.position_applied && touched.position_applied ? 'border-red-500' : 'border-gray-300' }`}
                        />
                        { errors.position_applied && touched.position_applied ? 
                          ( <div className="px-2 text-xs text-red-500">{errors.position_applied}</div> ) : null
                        }
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="source_information">
                          Dari mana anda mengetahui perihal lowongan ini?
                        </label>
                        <Field className={`py-2 px-4 border-[1px]  appearance-none outline-none rounded-full ${ errors.source_information && touched.source_information ? 'border-red-500' : 'border-gray-300' }`} name="source_information" as="select">
                          <option hidden defaultChecked defaultValue={undefined}>
                            Pilih salah satu
                          </option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="jobstreet">Jobstreet</option>
                          <option value="instagram">Instagram</option>
                          <option value="jobfair">Job Fair</option>
                          <option value="info recruitment campus">
                            Info Recruitment Campus
                          </option>
                          <option value="lainnya">Lainnya</option>
                        </Field>
                        { errors.source_information && touched.source_information ? 
                          ( <div className="px-2 text-xs text-red-500">{errors.source_information}</div> ) : null
                        }
                      </div>

                      <button className="my-4 p-3 bg-green-700 text-white font-semibold rounded-md" type="submit">Take a Test</button>

                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
          
        }

      </div>
  );
};

export default AdminLoginForm;
