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

interface BiodataFields {
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

const BiodataForm: React.FC<{}> = () => {

  const router = useRouter()

  const initialValues: BiodataFields = {
    email: "",
    name: "",
    birthdate: "",
    latest_education: "",
    position_applied: "",
    domicile_city: "",
    source_information: "",
  };

  const handleSubmit = async (values: BiodataFields) => {
    try {
      const res = await registerUser(values)
      const examSessionId = res.examSessionId
      if(!examSessionId){
        router.refresh()
      } else {
        router.push(`/disc/${examSessionId}?question=1`)
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div>
      <h1>Biodata</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" placeholder="Email" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="name">Nama lengkap</label>
              <Field id="name" name="name" placeholder="Nama Lengkap" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="birthdate">Tanggal Lahir</label>
              <Field
                id="birthdate"
                name="birthdate"
                placeholder="Tanggal Lahir"
              />
            </div>

            <div
              className="flex flex-col gap-1"
              role="group"
              aria-labelledby="my-radio-group"
            >
              <label>Pendidikan Terakhir</label>
              <label>
                <Field
                  type="radio"
                  name="latest_education"
                  value="SMA / SMK / Sederajat"
                />
                SMA / SMK / Sederajat
              </label>
              <label>
                <Field type="radio" name="latest_education" value="Diploma" />
                Diploma
              </label>
              <label>
                <Field type="radio" name="latest_education" value="Sarjana" />
                Sarjana
              </label>
              <label>
                <Field type="radio" name="latest_education" value="Lainnya" />
                Lainnya
              </label>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="position_applied">Posisi yang Dilamar</label>
              <Field
                id="position_applied"
                name="position_applied"
                placeholder="Posisi yang dilamar"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="domicile_city">Kota Domisili</label>
              <Field
                id="domicile_city"
                name="domicile_city"
                placeholder="Kota domisili "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="source_information">
                DARI MANA ANDA MENGETAHUI PERIHAL LOWONGAN INI?
              </label>
              <Field name="source_information" component="select">
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
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BiodataForm;
