import InputGroup from "@/components/form/input/input-group";
import Select from "./input/select";
import Textarea from "./input/textarea";
import Button from "./input/button";
import { FolderPlusIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import Checkbox from "./input/checkbox";
import MultipleSelect from "./input/multiple-select";
import { useState } from "react";

export default function FormAddMerchant() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Enables real-time validation
  });

  const opstionsC = [
    { id: "id", name: "name" },
    { id: "id1", name: "name1" },
    { id: "id2", name: "name2" },
  ];

  const onSubmit = async (values) => {
    console.log("ini values ", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Candidate Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputGroup
                label="Nama"
                id="nama"
                name="nama"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
              <InputGroup
                label="Email address"
                id="email"
                name="email"
                type="email"
                register={register}
                validation={{
                  required: false,
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Format email not valid",
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-2">
              <InputGroup
                label="Valid From"
                id="valid-from"
                name="valid_from"
                type="date"
                register={register}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-2">
              <InputGroup
                label="Valid Thru"
                id="valid-thru"
                name="valid_thru"
                type="date"
                register={register}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-1 flex items-end">
              <Checkbox label="Aktif" id="is-active" name="is_active" register={register} errors={errors} />
            </div>
            <div className="sm:col-span-3">
              <InputGroup
                label="Website"
                id="website"
                name="website"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>

            {/* <div className="sm:col-span-2 sm:col-start-1">
              <Select
                label="Gender"
                id="gender"
                name="gender"
                options={opstionsC}
                register={register}
                errors={errors}
                validation={{ required: "This field is required" }}
              />
            </div> */}
            <div className="sm:col-span-3">
              <InputGroup
                label="Nama PIC"
                id="nama-pic"
                name="nama-pic"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
              <InputGroup
                label="Nomor Telepon PIC"
                id="phone-number-pic"
                name="phone_number_pic"
                type="text"
                register={register}
                validation={{
                  required: false,
                  pattern: {
                    value: /^(\+62|62|0)8[1-9][0-9]{6,10}$/,
                    message: "Please enter a valid phone number",
                  },
                }}
                errors={errors}
              />
            </div>

            <div className="col-span-3">
              <InputGroup label="Alamat" id="alamat" name="alamat" type="text" register={register} errors={errors} />
            </div>
            <div className="col-span-3">
              <MultipleSelect label={"Kategori"} id={"Kategori"} optionsList={opstionsC} placeholder={"Kategori"} />
            </div>
            <div className="col-span-3">
              <MultipleSelect
                label={"Media Promosi"}
                id={"media-promosi"}
                optionsList={opstionsC}
                placeholder={"Media Promosi"}
              />
            </div>
            <div className="col-span-3">
              <MultipleSelect
                label={"Nama PIC MRO"}
                id={"nama-pic-mro"}
                optionsList={opstionsC}
                placeholder={"Nama PIC MRO"}
              />
            </div>
          </div>
        </div>

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Additional Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We&apos;ll always let you know about important changes, but you pick what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <InputGroup label="Title" id="title" name="title" type="text" register={register} errors={errors} />
              </div>

              <div className="sm:col-span-2">
                <Select label="Level" id="level" name="level" options={opstionsC} register={register} errors={errors} />
              </div>

              <div className="sm:col-span-2">
                <InputGroup
                  label="Work Experience (in years, e.g., 1.5)"
                  id="experience"
                  name="experience"
                  type="number"
                  step="0.01"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="sm:col-span-2">
                <InputGroup
                  label="Working area"
                  id="working-area"
                  name="working_area"
                  type="text"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="sm:col-span-2">
                <InputGroup
                  label="Notices"
                  id="notices"
                  name="notices"
                  type="text"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="sm:col-span-2">
                <Select
                  label="English"
                  id="english"
                  name="english"
                  options={opstionsC}
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="col-span-full">
                <Textarea label="Skills" id="skills" name="skills" rows={4} register={register} />
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Educations</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>

              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2 sm:col-start-1">
                    <Select
                      label="Degree"
                      id="degree"
                      name="degree"
                      options={opstionsC}
                      register={register}
                      errors={errors}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <InputGroup label="Major" id="major" name="major" type="text" register={register} errors={errors} />
                  </div>

                  <div className="sm:col-span-2">
                    <InputGroup
                      label="GPA (0.00 - 4.00)"
                      id="gpa"
                      name="gpa"
                      type="number"
                      step="0.01"
                      register={register}
                      validation={{
                        required: false,
                        min: {
                          value: 0,
                          message: "GPA cannot be less than 0.00",
                        },
                        max: {
                          value: 4,
                          message: "GPA cannot be more than 4.00",
                        },
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: "GPA must be a valid number with up to 2 decimal places",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Salary</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>

              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <Select
                      label="Status"
                      id="status"
                      name="status"
                      options={opstionsC}
                      register={register}
                      validation={{ required: "This field is required" }}
                      errors={errors}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputGroup
                      label="Apply Date"
                      id="apply-date"
                      name="apply_date"
                      type="date"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Select
                      label="Source"
                      id="source"
                      name="source"
                      options={opstionsC}
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Attachment</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>

              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <dl className="space-y-6 border-t border-gray-200 divide-y divide-gray-100 text-sm/6">
                      <div className="pt-4 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Resume</dt>
                        <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                          <div className="text-gray-900">Filename</div>
                          <div className="flex gap-x-4">
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                              Download
                            </button>
                            <button type="button" className="font-semibold text-red-600 hover:text-red-500">
                              Delete
                            </button>
                          </div>
                        </dd>
                      </div>
                      <div className="pt-4 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Resume</dt>
                        <dd className="flex justify-between mt-1 gap-x-6 sm:mt-0 sm:flex-auto">
                          <div className="text-gray-900">Filename</div>
                          <div className="flex gap-x-4">
                            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                              Download
                            </button>
                            <button type="button" className="font-semibold text-red-600 hover:text-red-500">
                              Delete
                            </button>
                          </div>
                        </dd>
                      </div>
                    </dl>
                    <dl className="mt-6 space-y-6 border-t border-gray-200 divide-y divide-gray-100 text-sm/6">
                      <div className="flex pt-6">
                        <button
                          onClick={() => {
                            setOpen(true);
                          }}
                          type="button"
                          className="font-semibold text-indigo-600 text-sm/6 hover:text-indigo-500"
                        >
                          <span aria-hidden="true">+</span> Add another file
                        </button>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="col-span-full">
              <Textarea label="Notes" id="notes" name="notes" rows={4} register={register} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/candidates")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
