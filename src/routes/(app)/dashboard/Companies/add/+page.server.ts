import { superValidate} from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types.js";
import { accountFormSchema } from "./company-form.svelte";
import { fail, type Actions } from "@sveltejs/kit";
import {redirect} from "sveltekit-flash-message/server";
import db from "$lib/server/database"
import {Company} from "$models/companies"
import { eq } from 'drizzle-orm';
import { setFormError } from "$lib/utils/helpers/forms";
import * as m from '$lib/utils/messages';
import { generateNanoId } from "$lib/utils/helpers/nanoid";


export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(accountFormSchema)),
        metadata: {
            title: "AccountForm",
            description: "Account form schema",
            image: "",
            url: "",
	    }
    }   
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(accountFormSchema));
		if (!form.valid) {
			// console.log(form);
			return fail(400, {
				form,
			});
		}
        else {
            const { name,address,companynumber,licensenumber, } = form.data;
        
        const existingCompany = await db.query.Company.findFirst({
            where: eq(Company.companyname, name),
            columns: {
              id: true
            }
          });
      
          if (existingCompany) {
            return setFormError(
              form,
              m.company.exists,
              {
                field: 'name',
              },
              event
            );
          }
          
            const existingLicense = await db.query.Company.findFirst({
                where: eq(Company.licensenumber, licensenumber),
            })
            if(existingLicense){
                return setFormError(
                    form,
                    m.company.license_exists,
                    {
                      field: 'licensenumber',
                    },
                    event
                  );
            }
            const companyId = generateNanoId();
            //create a transaction which adds the company details into database
            try{await db.transaction(async (trx) => {
              await trx.insert(Company).values({
                id:companyId,
                companyname: name,
                address: address,
                licensenumber: licensenumber,
                companynumber: companynumber
              });
            })
            }
            catch(err){
                redirect(
                    {
                      status: 500,
                      type: 'error',
                      message: m.general.error
                    },
                    event
                  );
            }

          }
          redirect('/dashboard/Companies',{ type: 'success', message: m.company.create.success }, event);

	},
};
// export const actions = {addCompany}