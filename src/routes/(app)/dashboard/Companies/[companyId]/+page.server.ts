import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types.js';
import { accountFormSchema, deleteCompanySchema } from './company-form.svelte';
import { fail, type Actions } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import db from '$lib/server/database';
import { Company } from '$models/companies';
import { eq } from 'drizzle-orm';
// import { setFormError } from '$lib/utils/helpers/forms';
import * as m from '$lib/utils/messages';
// import { generateNanoId } from '$lib/utils/helpers/nanoid';

export const load: PageServerLoad = async (event) => {
  const companyDetails = await db.query.Company.findFirst({
    where: eq(Company.publicId, event.params.companyId)
  });
  console.log(companyDetails)
  if (!companyDetails) {
    redirect('/dashboard/Companies', { type: 'error', message: m.general.error }, event);
  }
  const editCompanyForm = await superValidate(
    {
      name: companyDetails.companyname,
      address: companyDetails.address,
      companynumber: companyDetails.companynumber,
      licensenumber: companyDetails.licensenumber
    },
    zod(accountFormSchema),{
      id: 'edit-company-form',
      errors:false
    }
  );
  const deleteCompanyForm = await superValidate(
    {publicId :companyDetails.publicId},
    zod(deleteCompanySchema),{
      id: 'delete-company-form',
      errors:false
    }
  );
  return {
    editCompanyForm,
    deleteCompanyForm,
    metadata: {
      title: 'AccountForm',
      description: 'Account form schema',
      image: '',
      url: ''
    }
  };
};

export const actions: Actions = {
  editCompany: async (event) => {
    const form = await superValidate(event, zod(accountFormSchema));
    console.log(form)
    if (!form.valid) {
      // console.log(form);
      return fail(400, {
        form
      });
    } else {
      const { name, address, licensenumber } = form.data;

      const existingCompany = await db.query.Company.findFirst({
        where: eq(Company.licensenumber,licensenumber),
      });
      console.log(existingCompany)
      
        
        
        // return setFormError(
        //   form,
        //   m.company.exists,
        //   {
        //     field: 'name',
        //   },
        //   event
        // );
      

      // const existingLicense = await db.query.Company.findFirst({
      //   where: eq(Company.licensenumber, licensenumber)
      // });
      // if (existingLicense) {
      //   return setFormError(
      //     form,
      //     m.company.license_exists,
      //     {
      //       field: 'licensenumber'
      //     },
      //     event
      //   );
      // }
      // const companyId = generateNanoId();
      //create a transaction which adds the company details into database
      try {
        if (existingCompany) {
        await db
          .update(Company)
          .set({ companyname: name, address: address, updatedAt:new Date()})
          .where(eq(Company.id, existingCompany.id));
        }

        // await db.transaction(async (trx) => {
        //   await trx.insert(Company).values({
        //     id: companyId,
        //     companyname: name,
        //     address: address,
        //     licensenumber: licensenumber,
        //     companynumber: companynumber
        //   });
        // });
      } catch (err) {
        console.log(err)
        redirect(
          {
            status: 500,
            type: 'error',
            message: m.company.update.failure
          },
          event
        );
      }
    }
    redirect({ type: 'success', message: m.company.update.success }, event);
  },
  deleteCompany: async (event)=>{
      const form = await superValidate(event, zod(deleteCompanySchema));
    console.log(form)
    if (!form.valid) {
      // console.log(form);
      return fail(400, {
        form
      });
    } else {
      const {publicId} = form.data;

      const existingCompany = await db.query.Company.findFirst({
        where: eq(Company.publicId,publicId),
      });
      console.log(existingCompany)
      try {
        if (existingCompany) {
        await db
          .delete(Company)
          .where(eq(Company.id, existingCompany.id));
        }
      } catch (err) {
        console.log(err)
        redirect(
          {
            status: 500,
            type: 'error',
            message: m.company.update.failure
          },
          event
        );
      }
    }
    redirect('/dashboard/Companies',{ type: 'success', message: m.company.delete.success }, event);
  }
};
// export const actions = {addCompany}
