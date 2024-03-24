import { superValidate} from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types.js";
import { accountFormSchema, deleteStockSchema } from "./stock-form.svelte";
import { fail, type Actions } from "@sveltejs/kit";
import {redirect} from "sveltekit-flash-message/server";
import db from "$lib/server/database"
import {Company} from "$models/companies"
import {Stocks} from "$models/stocks"
import { eq } from 'drizzle-orm';
import { setFormError } from "$lib/utils/helpers/forms";
import * as m from '$lib/utils/messages';
// import { generateNanoId } from "$lib/utils/helpers/nanoid";


export const load: PageServerLoad = async (event) => {
  const stockDetails = await db.query.Stocks.findFirst(
    {
      where: eq(Stocks.publicId, event.params.stockId)
    }
  );
  // console.log(stockDetails, event.params.stockId)
  if (!stockDetails) {
    redirect('/dashboard/Stocks', { type: 'error', message: m.general.error }, event);
  }
  const editStocksForm = await superValidate(
    {
      name: stockDetails?.medicinename,
      companyname: stockDetails?.company_name,
      quantity: stockDetails.quantity,
      priceperunit: stockDetails?.priceperunit,
      dob: stockDetails?.expiryDate.toISOString()
    },
    zod(accountFormSchema),{
      id: 'edit-stock-form',
      errors:false
    }
  );
  const deleteStocksForm = await superValidate(
    {publicId :stockDetails.publicId},
    zod(deleteStockSchema),{
      id: 'delete-stock-form',
      errors:false
    }
  );
	return {
    editStocksForm,
    deleteStocksForm,
        metadata: {
            title: "AccountForm",
            description: "Account form schema",
            image: "",
            url: "",
	    }
    }   
};

export const actions: Actions = {
	editStocks: async (event) => {
		const form = await superValidate(event, zod(accountFormSchema));
		if (!form.valid) {
			console.log(form);
			return fail(400, {
				form,
			});
		}
        else {
            const { name,companyname,priceperunit,dob,quantity } = form.data;
        
        const existingCompany = await db.query.Company.findFirst({
            where: eq(Company.companyname, companyname),
            columns: {
              id: true
            }
          });
          // console.log(existingCompany);
      
          if (!existingCompany) {
            return setFormError(
              form,
              m.company.does_not_exist,
              {
                field: 'companyname',
              },
              event
            );
          }
          
            const existingStock = await db.query.Stocks.findFirst({
                where: eq(Stocks.company_name, companyname),
            })
            if(existingStock){
              try{await db.transaction(async (trx) => {
                await trx.update(Stocks)
                .set({ medicinename: name,company_name: companyname,priceperunit: priceperunit, expiryDate: new Date(dob!), quantity: quantity })
                .where(eq(Stocks.id, existingStock.id));
              })
              }
              catch(err){
                console.log(err)
                  redirect(
                      {
                        status: 500,
                        type: 'error',
                        message: m.stock.update.failure
                      },
                      event
                    );
              }
            }
            //create a transaction which adds the company details into database
            

          }
          redirect({ type: 'success', message: m.stock.update.success }, event);

	},
  deleteStocks: async (event) => {
		const form = await superValidate(event, zod(deleteStockSchema));
		if (!form.valid) {
			console.log(form);
			return fail(400, {
				form,
			});
		}
        else {
            const { publicId } = form.data;
        
            const existingStock = await db.query.Stocks.findFirst({
                where: eq(Stocks.publicId, publicId)
            });
            if(existingStock){
              try{await db.transaction(async (trx) => {
                await trx.delete(Stocks).where(eq(Stocks.id, existingStock.id));
                });
              }
              
              catch(err){
                console.log(err)
                  redirect(
                      {
                        status: 500,
                        type: 'error',
                        message: m.stock.delete.failure
                      },
                      event
                    );
              }
            }
          }
            //create a transaction which adds the company details into database

          
          redirect('/dashboard/Stocks',{ type: 'success', message: m.stock.delete.success }, event);

	},
};



// use this if we dont have data in the database left;
// export const actions = {addCompany}

// let medicinename = [
//   "Interfeterol Alcafvirenz",
//   "Fenoneva",
//   "Sensidosyn",
//   "Agalsiprofen",
//   "Ganizolid",
//   "Phytomab",
//   "Specpirox",
//   "Adinil Alglusirox",
//   "Amphetacept Clasulin",
//   "Cortitonin Hemaroban",
//   "Abobotacept",
//   "Ageferol",
//   "Omexapine",
//   "Diarotec",
//   "Arteranon",
//   "Afretaine",
//   "Suboracin Effitrana",
//   "Amphetavarix Nizofine",
//   "Hydroxycept Acloronate",
//   "Ariramine Pralirabine",
//   "Afinigestrel",
//   "Requibucil",
//   "Phytoletine",
//   "Bonisin",
//   "Olanzaloride",
//   "Tamofoxin",
//   "Inviferon Aquagomar",
//   "Sumagestin Azariva",
//   "Podotane Alkemycin",
//   "Pancrelimus Neurostrel"]
//   let priceperunit = [
//   "666",
//   "877",
//   "030",
//   "745",
//   "545",
//   "087",
//   "125",
//   "558",
//   "237",
//   "341",
//   "569",
//   "834",
//   "890",
//   "945",
//   "696",
//   "143",
//   "194",
//   "975",
//   "659",
//   "055",
//   "321",
//   "060",
//   "290",
//   "095",
//   "959",
//   "926",
//   "900",
//   "028",
//   "344",
//   "572"
//   ]
//   let dates = [
//     "2024-12-31T06:48:11",
//     "2024-09-25T00:52:42",
//     "2024-12-01T00:26:27",
//     "2024-05-11T15:11:29",
//     "2025-06-04T18:25:46",
//     "2024-12-18T19:23:10",
//     "2025-08-31T05:30:19",
//     "2024-07-10T07:21:22",
//     "2025-07-31T12:34:46",
//     "2025-06-13T04:02:35",
//     "2024-07-13T02:28:54",
//     "2025-04-14T17:15:06",
//     "2025-05-27T04:59:23",
//     "2024-05-14T23:39:22",
//     "2025-03-04T09:55:12",
//     "2025-08-09T21:01:05",
//     "2025-04-25T13:40:05",
//     "2024-12-12T22:34:33",
//     "2024-06-19T21:07:49",
//     "2025-01-03T04:56:21",
//     "2024-11-22T21:47:34",
//     "2025-01-31T11:02:12",
//     "2025-03-12T05:38:29",
//     "2025-09-20T11:18:21",
//     "2024-11-06T03:43:28",
//     "2024-07-05T12:01:17",
//     "2024-05-25T15:47:35",
//     "2025-04-11T23:27:30",
//     "2025-02-07T00:07:45",
//     "2025-08-26T16:47:44"  
//   ]
//   let finalarray = [
//     { "quantity": 0 },
//     { "quantity": 8 },
//     { "quantity": 9 },
//     { "quantity": 4 },
//     { "quantity": 4 },
//     { "quantity": 0 },
//     { "quantity": 8 },
//     { "quantity": 7 },
//     { "quantity": 2 },
//     { "quantity": 3 },
//     { "quantity": 6 },
//     { "quantity": 2 },
//     { "quantity": 6 },
//     { "quantity": 9 },
//     { "quantity": 8 },
//     { "quantity": 2 },
//     { "quantity": 0 },
//     { "quantity": 5 },
//     { "quantity": 9 },
//     { "quantity": 9 },
//     { "quantity": 9 },
//     { "quantity": 0 },
//     { "quantity": 8 },
//     { "quantity": 8 },
//     { "quantity": 1 },
//     { "quantity": 5 },
//     { "quantity": 4 },
//     { "quantity": 1 },
//     { "quantity": 1 },
//     { "quantity": 5 }
//   ]
//    const data3 = [
      
//       {
//           "id": "w8dd8x0ojq5k",
//           "publicId": "eok6s05tiaq2",
//           "companyname": "Pardeshi, Balan and Karpe",
//           "address": "52, Sodala, Thiruvananthapuram - 333635",
//           "companynumber": 47172399,
//           "licensenumber": "7042864",
//           "createdAt": "2024-03-20T22:13:08.264Z",
//           "updatedAt": null
//       },
//       {
//           "id": "ag9zddrr5465",
//           "publicId": "wwgely4znqh4",
//           "companyname": "Magar, Dey and Mani",
//           "address": "60, Bhaagyasree Nagar, Mumbai - 256410",
//           "companynumber": 58181794,
//           "licensenumber": "67649",
//           "createdAt": "2024-03-20T22:22:34.520Z",
//           "updatedAt": null
//       },
//       {
//           "id": "6728p9mlx476",
//           "publicId": "49grbyrn6rrv",
//           "companyname": "Goswami Ltd",
//           "address": "45, Nidhi Apartments, JobinGarh Chandigarh - 369615",
//           "companynumber": 23,
//           "licensenumber": "99093",
//           "createdAt": "2024-03-20T23:01:00.253Z",
//           "updatedAt": null
//       },
//       {
//           "id": "ob0c5hkt1536",
//           "publicId": "alk5rrnsoe6w",
//           "companyname": "Maharaj Group",
//           "address": "32, Model Town, Kota - 363580",
//           "companynumber": 759,
//           "licensenumber": "79903936",
//           "createdAt": "2024-03-20T23:04:29.861Z",
//           "updatedAt": null
//       },
//       {
//           "id": "8rc5at9q3r1a",
//           "publicId": "8v4m0fpeevqp",
//           "companyname": "Mane LLC",
//           "address": "22, Aisha Apartments, Aundh Ahmedabad - 162888",
//           "companynumber": 32,
//           "licensenumber": "88144594",
//           "createdAt": "2024-03-20T23:05:12.109Z",
//           "updatedAt": null
//       },
//       {
//           "id": "2sn6rdbqyh91",
//           "publicId": "srl9zfumv8yk",
//           "companyname": "Kota-Mammen",
//           "address": "39, AbbasPur, Thiruvananthapuram - 271487",
//           "companynumber": 85275284,
//           "licensenumber": "7671282",
//           "createdAt": "2024-03-20T23:05:58.542Z",
//           "updatedAt": null
//       },
//       {
//           "id": "2gk2h6fiouix",
//           "publicId": "33rah41ukkqg",
//           "companyname": "Gala-Khatri",
//           "address": "43, Pushpa Society, LakshmiPur Pune - 153323",
//           "companynumber": 80,
//           "licensenumber": "690",
//           "createdAt": "2024-03-20T23:06:30.934Z",
//           "updatedAt": null
//       },
//       {
//           "id": "sepm8a3qn6c2",
//           "publicId": "43z6y40mh85o",
//           "companyname": "Ramnarine, Brahmbhatt and Raj",
//           "address": "10, Aarif Villas, ShwetaGunj Gurgaon - 246263",
//           "companynumber": 57,
//           "licensenumber": "227370",
//           "createdAt": "2024-03-20T23:07:50.370Z",
//           "updatedAt": null
//       },
//       {
//           "id": "4rghd195yuo7",
//           "publicId": "simqe1dobpvq",
//           "companyname": "Ganesh, Gulati and Dass",
//           "address": "49, Sheetal Heights, Bandra Dehra Dun - 159285",
//           "companynumber": 15,
//           "licensenumber": " 179855",
//           "createdAt": "2024-03-20T23:08:31.582Z",
//           "updatedAt": null
//       },
//       {
//           "id": "ifktxv2cl1qg",
//           "publicId": "uuujlaxsrgjj",
//           "companyname": "Jaggi LLC",
//           "address": "29, Kharadi, Ajmer - 434752",
//           "companynumber": 50,
//           "licensenumber": "16950",
//           "createdAt": "2024-03-20T23:09:05.204Z",
//           "updatedAt": null
//       },
//       {
//           "id": "3lhcf85pg8rt",
//           "publicId": "crxrkf2nvgv0",
//           "companyname": "Dua-Banerjee",
//           "address": "70, Isha Heights, Runjhun Chowk Panaji - 353192",
//           "companynumber": 97086951,
//           "licensenumber": "544965",
//           "createdAt": "2024-03-20T23:09:44.205Z",
//           "updatedAt": null
//       },
//       {
//           "id": "i5ks8v0qkps3",
//           "publicId": "lmwadg20a3fx",
//           "companyname": "Dhillon, Sekhon and Kakar",
//           "address": "31, Binita Villas, Dadar Panaji - 200457",
//           "companynumber": 31,
//           "licensenumber": "230519371",
//           "createdAt": "2024-03-20T23:10:08.319Z",
//           "updatedAt": null
//       },
//       {
//           "id": "1y4477pxxo8g",
//           "publicId": "zjicsa68bmsp",
//           "companyname": "Mogul, Kunda and Dugal",
//           "address": "86, Vivek Heights, Mansarovar Delhi - 223504",
//           "companynumber": 444,
//           "licensenumber": "5934",
//           "createdAt": "2024-03-20T23:10:33.476Z",
//           "updatedAt": null
//       },
//       {
//           "id": "gs9zfx9ht5g5",
//           "publicId": "tky8xsrkjkms",
//           "companyname": "Biswas, Rastogi and Hegde",
//           "address": "43, Indrani Nagar, Ajmer - 276309",
//           "companynumber": 3341937,
//           "licensenumber": "86239",
//           "createdAt": "2024-03-20T23:10:58.354Z",
//           "updatedAt": null
//       },
//       {
//           "id": "vjchohhdbd91",
//           "publicId": "4r7yabh9fwku",
//           "companyname": "Deol-Bobal",
//           "address": "54, AniruddhGunj, New Delhi - 532419",
//           "companynumber": 835688,
//           "licensenumber": "994271961",
//           "createdAt": "2024-03-20T23:11:38.192Z",
//           "updatedAt": null
//       },
//       {
//           "id": "auplpm3j9c2k",
//           "publicId": "0f5gfhaa7b1n",
//           "companyname": "Ahluwalia-Bal",
//           "address": "70, Gowri Villas, PoojaPur Thiruvananthapuram - 165379",
//           "companynumber": 45982633,
//           "licensenumber": "723848742",
//           "createdAt": "2024-03-20T23:12:03.392Z",
//           "updatedAt": null
//       },
//       {
//           "id": "izf6tmeux3u9",
//           "publicId": "j7nh3gcs6zhl",
//           "companyname": "Parsa-Malhotra",
//           "address": "12, Tushar Heights, NupoorGarh Rajkot - 530971",
//           "companynumber": 20,
//           "licensenumber": "76115",
//           "createdAt": "2024-03-20T23:12:33.392Z",
//           "updatedAt": null
//       },
//       {
//           "id": "p540raeoukvu",
//           "publicId": "2k3pkbnsjeoh",
//           "companyname": "Malpani LLC",
//           "address": "25, Kharadi, Meerut - 386934",
//           "companynumber": 76642303,
//           "licensenumber": "1263180",
//           "createdAt": "2024-03-20T23:12:54.811Z",
//           "updatedAt": null
//       },
//       {
//           "id": "lrrbq7d1omkm",
//           "publicId": "vrhkzrb0x2e2",
//           "companyname": "Muni, Prabhakar and Tata",
//           "address": "25, Yerwada, Ajmer - 306812",
//           "companynumber": 1712,
//           "licensenumber": "540766247",
//           "createdAt": "2024-03-20T23:13:34.487Z",
//           "updatedAt": null
//       },
//       {
//           "id": "hzykbvyox2h5",
//           "publicId": "v3zgmymxhlrn",
//           "companyname": "Dave-Ahuja",
//           "address": "42, Yeshwanthpura, Jodhpur - 459340",
//           "companynumber": 60,
//           "licensenumber": "22763121",
//           "createdAt": "2024-03-20T23:14:10.110Z",
//           "updatedAt": null
//       },
//       {
//           "id": "wpdelhq2dz60",
//           "publicId": "u7c6sm83e8hi",
//           "companyname": "Bora, Kulkarni and Nawal",
//           "address": "32, Trishana Apartments, Yerwada Ratlam - 209689",
//           "companynumber": 358,
//           "licensenumber": "635333802",
//           "createdAt": "2024-03-20T23:15:05.015Z",
//           "updatedAt": null
//       },
//       {
//           "id": "mft68rpttoya",
//           "publicId": "pp0u8w36mupv",
//           "companyname": "Maheshwari Group",
//           "address": "98, Goregaon, Panaji - 141821",
//           "companynumber": 80,
//           "licensenumber": "218606154",
//           "createdAt": "2024-03-20T23:15:29.050Z",
//           "updatedAt": null
//       },
//       {
//           "id": "ldwqpc48f1yh",
//           "publicId": "ijb7jwcp3yg5",
//           "companyname": "Parmer, Grover and Muni",
//           "address": "19, Umesh Society, Model Town Vishakhapattanam - 552344",
//           "companynumber": 388413,
//           "licensenumber": "997847",
//           "createdAt": "2024-03-20T23:15:53.521Z",
//           "updatedAt": null
//       },
//       {
//           "id": "bf8b2d8l5mpr",
//           "publicId": "apfwehgnqeji",
//           "companyname": "Soman LLC",
//           "address": "23, Javed Society, KirtiGarh Raipur - 189222",
//           "companynumber": 15147,
//           "licensenumber": "158724",
//           "createdAt": "2024-03-20T23:16:18.262Z",
//           "updatedAt": null
//       },
//       {
//           "id": "chtwbjr3v9fr",
//           "publicId": "9zinpyqtppz3",
//           "companyname": "Munshi, Desai and Tella",
//           "address": "36, Chinchwad, Ahmedabad - 594214",
//           "companynumber": 45647,
//           "licensenumber": "4915570",
//           "createdAt": "2024-03-20T23:16:56.633Z",
//           "updatedAt": null
//       },
//       {
//           "id": "7zag89hdbmu5",
//           "publicId": "4uvpu66za47o",
//           "companyname": "Tara-Sampath",
//           "address": "61, RatanGarh, Pune - 568750",
//           "companynumber": 366,
//           "licensenumber": "964621379",
//           "createdAt": "2024-03-20T23:17:29.691Z",
//           "updatedAt": null
//       },
//       {
//           "id": "ak2q80a60zl3",
//           "publicId": "rcld0fnvpvmk",
//           "companyname": "Dayal-Acharya",
//           "address": "30, Richa Apartments, Andheri Meerut - 547761",
//           "companynumber": 3780,
//           "licensenumber": "4228",
//           "createdAt": "2024-03-20T23:17:57.018Z",
//           "updatedAt": null
//       },
//       {
//           "id": "o55p3r971rdo",
//           "publicId": "w3czzlhe5g5a",
//           "companyname": "Behl-Gala",
//           "address": "80, Babita Nagar, Jaipur - 309615",
//           "companynumber": 4777,
//           "licensenumber": "24924",
//           "createdAt": "2024-03-20T23:18:25.185Z",
//           "updatedAt": null
//       },
//       {
//           "id": "yfwdk0q9uk7e",
//           "publicId": "g89x3vfda5v7",
//           "companyname": "Datta, Narayanan and Mander",
//           "address": "12, Himesh Villas, Ram Gopal Chowk Simla - 128414",
//           "companynumber": 29358,
//           "licensenumber": "257240",
//           "createdAt": "2024-03-20T23:18:52.902Z",
//           "updatedAt": null
//       },
//       {
//           "id": "g23umana4zlx",
//           "publicId": "5k4x1crn2lkj",
//           "companyname": "Saha-Sastry",
//           "address": "39, Bagwati Heights, Deccan Gymkhana Bhubhaneshwar - 426578",
//           "companynumber": 23,
//           "licensenumber": "140140",
//           "createdAt": "2024-03-20T23:19:17.865Z",
//           "updatedAt": null
//       }
//       // ...
//     ];
//   for (let i=0; i<finalarray.length;i++){
//       finalarray[i].medicinename=medicinename[i];
//       finalarray[i].priceperunit =priceperunit[i];
//       finalarray[i].expiryDate = dates[i];
//       finalarray[i].companyname = data3[i].companyname
//   }
//   console.log(finalarray)