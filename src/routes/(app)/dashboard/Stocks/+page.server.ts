import type { PageServerLoad } from './$types';
import db from "$lib/server/database";
import {Stocks} from "$models/stocks";
// import { generateNanoId } from '$lib/utils/helpers/nanoid';
// import {Users} from "$models/user"
export const load: PageServerLoad = async() => {
    // console.log(await db.select().from(Users))
    const stocks = await db.select().from(Stocks)
    //to add stocks if there are none available
    // if (stocks.length===0){
    //     try{ 
    //         const stocks1 =
    //         [
    //             {
    //               quantity: 0,
    //               medicinename: 'Interfeterol Alcafvirenz',
    //               priceperunit: '666',
    //               expiryDate: '2024-12-31T06:48:11',
    //               companyname: 'Pardeshi, Balan and Karpe'
    //             },
    //             {
    //               quantity: 8,
    //               medicinename: 'Fenoneva',
    //               priceperunit: '877',
    //               expiryDate: '2024-09-25T00:52:42',
    //               companyname: 'Magar, Dey and Mani'
    //             },
    //             {
    //               quantity: 9,
    //               medicinename: 'Sensidosyn',
    //               priceperunit: '030',
    //               expiryDate: '2024-12-01T00:26:27',
    //               companyname: 'Goswami Ltd'
    //             },
    //             {
    //               quantity: 4,
    //               medicinename: 'Agalsiprofen',
    //               priceperunit: '745',
    //               expiryDate: '2024-05-11T15:11:29',
    //               companyname: 'Maharaj Group'
    //             },
    //             {
    //               quantity: 4,
    //               medicinename: 'Ganizolid',
    //               priceperunit: '545',
    //               expiryDate: '2025-06-04T18:25:46',
    //               companyname: 'Mane LLC'
    //             },
    //             {
    //               quantity: 0,
    //               medicinename: 'Phytomab',
    //               priceperunit: '087',
    //               expiryDate: '2024-12-18T19:23:10',
    //               companyname: 'Kota-Mammen'
    //             },
    //             {
    //               quantity: 8,
    //               medicinename: 'Specpirox',
    //               priceperunit: '125',
    //               expiryDate: '2025-08-31T05:30:19',
    //               companyname: 'Gala-Khatri'
    //             },
    //             {
    //               quantity: 7,
    //               medicinename: 'Adinil Alglusirox',
    //               priceperunit: '558',
    //               expiryDate: '2024-07-10T07:21:22',
    //               companyname: 'Ramnarine, Brahmbhatt and Raj'
    //             },
    //             {
    //               quantity: 2,
    //               medicinename: 'Amphetacept Clasulin',
    //               priceperunit: '237',
    //               expiryDate: '2025-07-31T12:34:46',
    //               companyname: 'Ganesh, Gulati and Dass'
    //             },
    //             {
    //               quantity: 3,
    //               medicinename: 'Cortitonin Hemaroban',
    //               priceperunit: '341',
    //               expiryDate: '2025-06-13T04:02:35',
    //               companyname: 'Jaggi LLC'
    //             },
    //             {
    //               quantity: 6,
    //               medicinename: 'Abobotacept',
    //               priceperunit: '569',
    //               expiryDate: '2024-07-13T02:28:54',
    //               companyname: 'Dua-Banerjee'
    //             },
    //             {
    //               quantity: 2,
    //               medicinename: 'Ageferol',
    //               priceperunit: '834',
    //               expiryDate: '2025-04-14T17:15:06',
    //               companyname: 'Dhillon, Sekhon and Kakar'
    //             },
    //             {
    //               quantity: 6,
    //               medicinename: 'Omexapine',
    //               priceperunit: '890',
    //               expiryDate: '2025-05-27T04:59:23',
    //               companyname: 'Mogul, Kunda and Dugal'
    //             },
    //             {
    //               quantity: 9,
    //               medicinename: 'Diarotec',
    //               priceperunit: '945',
    //               expiryDate: '2024-05-14T23:39:22',
    //               companyname: 'Biswas, Rastogi and Hegde'
    //             },
    //             {
    //               quantity: 8,
    //               medicinename: 'Arteranon',
    //               priceperunit: '696',
    //               expiryDate: '2025-03-04T09:55:12',
    //               companyname: 'Deol-Bobal'
    //             },
    //             {
    //               quantity: 2,
    //               medicinename: 'Afretaine',
    //               priceperunit: '143',
    //               expiryDate: '2025-08-09T21:01:05',
    //               companyname: 'Ahluwalia-Bal'
    //             },
    //             {
    //               quantity: 0,
    //               medicinename: 'Suboracin Effitrana',
    //               priceperunit: '194',
    //               expiryDate: '2025-04-25T13:40:05',
    //               companyname: 'Parsa-Malhotra'
    //             },
    //             {
    //               quantity: 5,
    //               medicinename: 'Amphetavarix Nizofine',
    //               priceperunit: '975',
    //               expiryDate: '2024-12-12T22:34:33',
    //               companyname: 'Malpani LLC'
    //             },
    //             {
    //               quantity: 9,
    //               medicinename: 'Hydroxycept Acloronate',
    //               priceperunit: '659',
    //               expiryDate: '2024-06-19T21:07:49',
    //               companyname: 'Muni, Prabhakar and Tata'
    //             },
    //             {
    //               quantity: 9,
    //               medicinename: 'Ariramine Pralirabine',
    //               priceperunit: '055',
    //               expiryDate: '2025-01-03T04:56:21',
    //               companyname: 'Dave-Ahuja'
    //             },
    //             {
    //               quantity: 9,
    //               medicinename: 'Afinigestrel',
    //               priceperunit: '321',
    //               expiryDate: '2024-11-22T21:47:34',
    //               companyname: 'Bora, Kulkarni and Nawal'
    //             },
    //             {
    //               quantity: 0,
    //               medicinename: 'Requibucil',
    //               priceperunit: '060',
    //               expiryDate: '2025-01-31T11:02:12',
    //               companyname: 'Maheshwari Group'
    //             },
    //             {
    //               quantity: 8,
    //               medicinename: 'Phytoletine',
    //               priceperunit: '290',
    //               expiryDate: '2025-03-12T05:38:29',
    //               companyname: 'Parmer, Grover and Muni'
    //             },
    //             {
    //               quantity: 8,
    //               medicinename: 'Bonisin',
    //               priceperunit: '095',
    //               expiryDate: '2025-09-20T11:18:21',
    //               companyname: 'Soman LLC'
    //             },
    //             {
    //               quantity: 1,
    //               medicinename: 'Olanzaloride',
    //               priceperunit: '959',
    //               expiryDate: '2024-11-06T03:43:28',
    //               companyname: 'Munshi, Desai and Tella'
    //             },
    //             {
    //               quantity: 5,
    //               medicinename: 'Tamofoxin',
    //               priceperunit: '926',
    //               expiryDate: '2024-07-05T12:01:17',
    //               companyname: 'Tara-Sampath'
    //             },
    //             {
    //               quantity: 4,
    //               medicinename: 'Inviferon Aquagomar',
    //               priceperunit: '900',
    //               expiryDate: '2024-05-25T15:47:35',
    //               companyname: 'Dayal-Acharya'
    //             },
    //             {
    //               quantity: 1,
    //               medicinename: 'Sumagestin Azariva',
    //               priceperunit: '028',
    //               expiryDate: '2025-04-11T23:27:30',
    //               companyname: 'Behl-Gala'
    //             },
    //             {
    //               quantity: 1,
    //               medicinename: 'Podotane Alkemycin',
    //               priceperunit: '344',
    //               expiryDate: '2025-02-07T00:07:45',
    //               companyname: 'Datta, Narayanan and Mander'
    //             },
    //             {
    //               quantity: 5,
    //               medicinename: 'Pancrelimus Neurostrel',
    //               priceperunit: '572',
    //               expiryDate: '2025-08-26T16:47:44',
    //               companyname: 'Saha-Sastry'
    //             }
    //           ];

    //                   stocks1.forEach(async(stock1) => {
    //                     const stockId = generateNanoId();
    //                  await db.insert(Stocks).values(
    //                     {
    //                     id:stockId,
    //                     medicinename: stock1.medicinename,
    //                     quantity: stock1.quantity,
    //                     priceperunit: Number(stock1.priceperunit),
    //                     company_name: stock1.companyname,
    //                     expiryDate:new Date(stock1.expiryDate)
    //                  });
    //           })
    //     }catch(err){
    //         console.log(err)
    //     }
        
    // }
    // [
    //     {
    //       quantity: 0,
    //       medicinename: 'Interfeterol Alcafvirenz',
    //       priceperunit: '666',
    //       expiryDate: '2024-12-31T06:48:11',
    //       companyname: 'Pardeshi, Balan and Karpe'
    //     },
    //     {
    //       quantity: 8,
    //       medicinename: 'Fenoneva',
    //       priceperunit: '877',
    //       expiryDate: '2024-09-25T00:52:42',
    //       companyname: 'Magar, Dey and Mani'
    //     },
    //     {
    //       quantity: 9,
    //       medicinename: 'Sensidosyn',
    //       priceperunit: '030',
    //       expiryDate: '2024-12-01T00:26:27',
    //       companyname: 'Goswami Ltd'
    //     },
    //     {
    //       quantity: 4,
    //       medicinename: 'Agalsiprofen',
    //       priceperunit: '745',
    //       expiryDate: '2024-05-11T15:11:29',
    //       companyname: 'Maharaj Group'
    //     },
    //     {
    //       quantity: 4,
    //       medicinename: 'Ganizolid',
    //       priceperunit: '545',
    //       expiryDate: '2025-06-04T18:25:46',
    //       companyname: 'Mane LLC'
    //     },
    //     {
    //       quantity: 0,
    //       medicinename: 'Phytomab',
    //       priceperunit: '087',
    //       expiryDate: '2024-12-18T19:23:10',
    //       companyname: 'Kota-Mammen'
    //     },
    //     {
    //       quantity: 8,
    //       medicinename: 'Specpirox',
    //       priceperunit: '125',
    //       expiryDate: '2025-08-31T05:30:19',
    //       companyname: 'Gala-Khatri'
    //     },
    //     {
    //       quantity: 7,
    //       medicinename: 'Adinil Alglusirox',
    //       priceperunit: '558',
    //       expiryDate: '2024-07-10T07:21:22',
    //       companyname: 'Ramnarine, Brahmbhatt and Raj'
    //     },
    //     {
    //       quantity: 2,
    //       medicinename: 'Amphetacept Clasulin',
    //       priceperunit: '237',
    //       expiryDate: '2025-07-31T12:34:46',
    //       companyname: 'Ganesh, Gulati and Dass'
    //     },
    //     {
    //       quantity: 3,
    //       medicinename: 'Cortitonin Hemaroban',
    //       priceperunit: '341',
    //       expiryDate: '2025-06-13T04:02:35',
    //       companyname: 'Jaggi LLC'
    //     },
    //     {
    //       quantity: 6,
    //       medicinename: 'Abobotacept',
    //       priceperunit: '569',
    //       expiryDate: '2024-07-13T02:28:54',
    //       companyname: 'Dua-Banerjee'
    //     },
    //     {
    //       quantity: 2,
    //       medicinename: 'Ageferol',
    //       priceperunit: '834',
    //       expiryDate: '2025-04-14T17:15:06',
    //       companyname: 'Dhillon, Sekhon and Kakar'
    //     },
    //     {
    //       quantity: 6,
    //       medicinename: 'Omexapine',
    //       priceperunit: '890',
    //       expiryDate: '2025-05-27T04:59:23',
    //       companyname: 'Mogul, Kunda and Dugal'
    //     },
    //     {
    //       quantity: 9,
    //       medicinename: 'Diarotec',
    //       priceperunit: '945',
    //       expiryDate: '2024-05-14T23:39:22',
    //       companyname: 'Biswas, Rastogi and Hegde'
    //     },
    //     {
    //       quantity: 8,
    //       medicinename: 'Arteranon',
    //       priceperunit: '696',
    //       expiryDate: '2025-03-04T09:55:12',
    //       companyname: 'Deol-Bobal'
    //     },
    //     {
    //       quantity: 2,
    //       medicinename: 'Afretaine',
    //       priceperunit: '143',
    //       expiryDate: '2025-08-09T21:01:05',
    //       companyname: 'Ahluwalia-Bal'
    //     },
    //     {
    //       quantity: 0,
    //       medicinename: 'Suboracin Effitrana',
    //       priceperunit: '194',
    //       expiryDate: '2025-04-25T13:40:05',
    //       companyname: 'Parsa-Malhotra'
    //     },
    //     {
    //       quantity: 5,
    //       medicinename: 'Amphetavarix Nizofine',
    //       priceperunit: '975',
    //       expiryDate: '2024-12-12T22:34:33',
    //       companyname: 'Malpani LLC'
    //     },
    //     {
    //       quantity: 9,
    //       medicinename: 'Hydroxycept Acloronate',
    //       priceperunit: '659',
    //       expiryDate: '2024-06-19T21:07:49',
    //       companyname: 'Muni, Prabhakar and Tata'
    //     },
    //     {
    //       quantity: 9,
    //       medicinename: 'Ariramine Pralirabine',
    //       priceperunit: '055',
    //       expiryDate: '2025-01-03T04:56:21',
    //       companyname: 'Dave-Ahuja'
    //     },
    //     {
    //       quantity: 9,
    //       medicinename: 'Afinigestrel',
    //       priceperunit: '321',
    //       expiryDate: '2024-11-22T21:47:34',
    //       companyname: 'Bora, Kulkarni and Nawal'
    //     },
    //     {
    //       quantity: 0,
    //       medicinename: 'Requibucil',
    //       priceperunit: '060',
    //       expiryDate: '2025-01-31T11:02:12',
    //       companyname: 'Maheshwari Group'
    //     },
    //     {
    //       quantity: 8,
    //       medicinename: 'Phytoletine',
    //       priceperunit: '290',
    //       expiryDate: '2025-03-12T05:38:29',
    //       companyname: 'Parmer, Grover and Muni'
    //     },
    //     {
    //       quantity: 8,
    //       medicinename: 'Bonisin',
    //       priceperunit: '095',
    //       expiryDate: '2025-09-20T11:18:21',
    //       companyname: 'Soman LLC'
    //     },
    //     {
    //       quantity: 1,
    //       medicinename: 'Olanzaloride',
    //       priceperunit: '959',
    //       expiryDate: '2024-11-06T03:43:28',
    //       companyname: 'Munshi, Desai and Tella'
    //     },
    //     {
    //       quantity: 5,
    //       medicinename: 'Tamofoxin',
    //       priceperunit: '926',
    //       expiryDate: '2024-07-05T12:01:17',
    //       companyname: 'Tara-Sampath'
    //     },
    //     {
    //       quantity: 4,
    //       medicinename: 'Inviferon Aquagomar',
    //       priceperunit: '900',
    //       expiryDate: '2024-05-25T15:47:35',
    //       companyname: 'Dayal-Acharya'
    //     },
    //     {
    //       quantity: 1,
    //       medicinename: 'Sumagestin Azariva',
    //       priceperunit: '028',
    //       expiryDate: '2025-04-11T23:27:30',
    //       companyname: 'Behl-Gala'
    //     },
    //     {
    //       quantity: 1,
    //       medicinename: 'Podotane Alkemycin',
    //       priceperunit: '344',
    //       expiryDate: '2025-02-07T00:07:45',
    //       companyname: 'Datta, Narayanan and Mander'
    //     },
    //     {
    //       quantity: 5,
    //       medicinename: 'Pancrelimus Neurostrel',
    //       priceperunit: '572',
    //       expiryDate: '2025-08-26T16:47:44',
    //       companyname: 'Saha-Sastry'
    //     }
    //   ]
      
    // console.log(company);
	return {
		stocks: stocks,
        metadata:{
            title: 'Stocks',
            description:"Stock list",
            image:"",
            url:""
        }
	};
};