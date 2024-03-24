<script lang="ts">
  import {
    createTable,
    Render,
    Subscribe,
    createRender,
  } from "svelte-headless-table";
  import {
    addPagination,
    addSortBy,
    addTableFilter,
    addHiddenColumns,
    addSelectedRows,
  } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import * as Table from "$lib/components/ui/table";
  import DataTableActions from "./data-table-actions.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import DataTableCheckbox from "./data-table-checkbox.svelte";
  export let data;
 
  type Company = {
    id: string;
    publicId: string,
    companyname: string,
    address: string,
    companynumber: number,
    licensenumber: string,
    createdAt: string,
    updatedAt: string|null
  };
  const data3: Company[] = [
    
    {
        "id": "w8dd8x0ojq5k",
        "publicId": "eok6s05tiaq2",
        "companyname": "Pardeshi, Balan and Karpe",
        "address": "52, Sodala, Thiruvananthapuram - 333635",
        "companynumber": 47172399,
        "licensenumber": "7042864",
        "createdAt": "2024-03-20T22:13:08.264Z",
        "updatedAt": null
    },
    {
        "id": "ag9zddrr5465",
        "publicId": "wwgely4znqh4",
        "companyname": "Magar, Dey and Mani",
        "address": "60, Bhaagyasree Nagar, Mumbai - 256410",
        "companynumber": 58181794,
        "licensenumber": "67649",
        "createdAt": "2024-03-20T22:22:34.520Z",
        "updatedAt": null
    },
    {
        "id": "6728p9mlx476",
        "publicId": "49grbyrn6rrv",
        "companyname": "Goswami Ltd",
        "address": "45, Nidhi Apartments, JobinGarh Chandigarh - 369615",
        "companynumber": 23,
        "licensenumber": "99093",
        "createdAt": "2024-03-20T23:01:00.253Z",
        "updatedAt": null
    },
    {
        "id": "ob0c5hkt1536",
        "publicId": "alk5rrnsoe6w",
        "companyname": "Maharaj Group",
        "address": "32, Model Town, Kota - 363580",
        "companynumber": 759,
        "licensenumber": "79903936",
        "createdAt": "2024-03-20T23:04:29.861Z",
        "updatedAt": null
    },
    {
        "id": "8rc5at9q3r1a",
        "publicId": "8v4m0fpeevqp",
        "companyname": "Mane LLC",
        "address": "22, Aisha Apartments, Aundh Ahmedabad - 162888",
        "companynumber": 32,
        "licensenumber": "88144594",
        "createdAt": "2024-03-20T23:05:12.109Z",
        "updatedAt": null
    },
    {
        "id": "2sn6rdbqyh91",
        "publicId": "srl9zfumv8yk",
        "companyname": "Kota-Mammen",
        "address": "39, AbbasPur, Thiruvananthapuram - 271487",
        "companynumber": 85275284,
        "licensenumber": "7671282",
        "createdAt": "2024-03-20T23:05:58.542Z",
        "updatedAt": null
    },
    {
        "id": "2gk2h6fiouix",
        "publicId": "33rah41ukkqg",
        "companyname": "Gala-Khatri",
        "address": "43, Pushpa Society, LakshmiPur Pune - 153323",
        "companynumber": 80,
        "licensenumber": "690",
        "createdAt": "2024-03-20T23:06:30.934Z",
        "updatedAt": null
    },
    {
        "id": "sepm8a3qn6c2",
        "publicId": "43z6y40mh85o",
        "companyname": "Ramnarine, Brahmbhatt and Raj",
        "address": "10, Aarif Villas, ShwetaGunj Gurgaon - 246263",
        "companynumber": 57,
        "licensenumber": "227370",
        "createdAt": "2024-03-20T23:07:50.370Z",
        "updatedAt": null
    },
    {
        "id": "4rghd195yuo7",
        "publicId": "simqe1dobpvq",
        "companyname": "Ganesh, Gulati and Dass",
        "address": "49, Sheetal Heights, Bandra Dehra Dun - 159285",
        "companynumber": 15,
        "licensenumber": " 179855",
        "createdAt": "2024-03-20T23:08:31.582Z",
        "updatedAt": null
    },
    {
        "id": "ifktxv2cl1qg",
        "publicId": "uuujlaxsrgjj",
        "companyname": "Jaggi LLC",
        "address": "29, Kharadi, Ajmer - 434752",
        "companynumber": 50,
        "licensenumber": "16950",
        "createdAt": "2024-03-20T23:09:05.204Z",
        "updatedAt": null
    },
    {
        "id": "3lhcf85pg8rt",
        "publicId": "crxrkf2nvgv0",
        "companyname": "Dua-Banerjee",
        "address": "70, Isha Heights, Runjhun Chowk Panaji - 353192",
        "companynumber": 97086951,
        "licensenumber": "544965",
        "createdAt": "2024-03-20T23:09:44.205Z",
        "updatedAt": null
    },
    {
        "id": "i5ks8v0qkps3",
        "publicId": "lmwadg20a3fx",
        "companyname": "Dhillon, Sekhon and Kakar",
        "address": "31, Binita Villas, Dadar Panaji - 200457",
        "companynumber": 31,
        "licensenumber": "230519371",
        "createdAt": "2024-03-20T23:10:08.319Z",
        "updatedAt": null
    },
    {
        "id": "1y4477pxxo8g",
        "publicId": "zjicsa68bmsp",
        "companyname": "Mogul, Kunda and Dugal",
        "address": "86, Vivek Heights, Mansarovar Delhi - 223504",
        "companynumber": 444,
        "licensenumber": "5934",
        "createdAt": "2024-03-20T23:10:33.476Z",
        "updatedAt": null
    },
    {
        "id": "gs9zfx9ht5g5",
        "publicId": "tky8xsrkjkms",
        "companyname": "Biswas, Rastogi and Hegde",
        "address": "43, Indrani Nagar, Ajmer - 276309",
        "companynumber": 3341937,
        "licensenumber": "86239",
        "createdAt": "2024-03-20T23:10:58.354Z",
        "updatedAt": null
    },
    {
        "id": "vjchohhdbd91",
        "publicId": "4r7yabh9fwku",
        "companyname": "Deol-Bobal",
        "address": "54, AniruddhGunj, New Delhi - 532419",
        "companynumber": 835688,
        "licensenumber": "994271961",
        "createdAt": "2024-03-20T23:11:38.192Z",
        "updatedAt": null
    },
    {
        "id": "auplpm3j9c2k",
        "publicId": "0f5gfhaa7b1n",
        "companyname": "Ahluwalia-Bal",
        "address": "70, Gowri Villas, PoojaPur Thiruvananthapuram - 165379",
        "companynumber": 45982633,
        "licensenumber": "723848742",
        "createdAt": "2024-03-20T23:12:03.392Z",
        "updatedAt": null
    },
    {
        "id": "izf6tmeux3u9",
        "publicId": "j7nh3gcs6zhl",
        "companyname": "Parsa-Malhotra",
        "address": "12, Tushar Heights, NupoorGarh Rajkot - 530971",
        "companynumber": 20,
        "licensenumber": "76115",
        "createdAt": "2024-03-20T23:12:33.392Z",
        "updatedAt": null
    },
    {
        "id": "p540raeoukvu",
        "publicId": "2k3pkbnsjeoh",
        "companyname": "Malpani LLC",
        "address": "25, Kharadi, Meerut - 386934",
        "companynumber": 76642303,
        "licensenumber": "1263180",
        "createdAt": "2024-03-20T23:12:54.811Z",
        "updatedAt": null
    },
    {
        "id": "lrrbq7d1omkm",
        "publicId": "vrhkzrb0x2e2",
        "companyname": "Muni, Prabhakar and Tata",
        "address": "25, Yerwada, Ajmer - 306812",
        "companynumber": 1712,
        "licensenumber": "540766247",
        "createdAt": "2024-03-20T23:13:34.487Z",
        "updatedAt": null
    },
    {
        "id": "hzykbvyox2h5",
        "publicId": "v3zgmymxhlrn",
        "companyname": "Dave-Ahuja",
        "address": "42, Yeshwanthpura, Jodhpur - 459340",
        "companynumber": 60,
        "licensenumber": "22763121",
        "createdAt": "2024-03-20T23:14:10.110Z",
        "updatedAt": null
    },
    {
        "id": "wpdelhq2dz60",
        "publicId": "u7c6sm83e8hi",
        "companyname": "Bora, Kulkarni and Nawal",
        "address": "32, Trishana Apartments, Yerwada Ratlam - 209689",
        "companynumber": 358,
        "licensenumber": "635333802",
        "createdAt": "2024-03-20T23:15:05.015Z",
        "updatedAt": null
    },
    {
        "id": "mft68rpttoya",
        "publicId": "pp0u8w36mupv",
        "companyname": "Maheshwari Group",
        "address": "98, Goregaon, Panaji - 141821",
        "companynumber": 80,
        "licensenumber": "218606154",
        "createdAt": "2024-03-20T23:15:29.050Z",
        "updatedAt": null
    },
    {
        "id": "ldwqpc48f1yh",
        "publicId": "ijb7jwcp3yg5",
        "companyname": "Parmer, Grover and Muni",
        "address": "19, Umesh Society, Model Town Vishakhapattanam - 552344",
        "companynumber": 388413,
        "licensenumber": "997847",
        "createdAt": "2024-03-20T23:15:53.521Z",
        "updatedAt": null
    },
    {
        "id": "bf8b2d8l5mpr",
        "publicId": "apfwehgnqeji",
        "companyname": "Soman LLC",
        "address": "23, Javed Society, KirtiGarh Raipur - 189222",
        "companynumber": 15147,
        "licensenumber": "158724",
        "createdAt": "2024-03-20T23:16:18.262Z",
        "updatedAt": null
    },
    {
        "id": "chtwbjr3v9fr",
        "publicId": "9zinpyqtppz3",
        "companyname": "Munshi, Desai and Tella",
        "address": "36, Chinchwad, Ahmedabad - 594214",
        "companynumber": 45647,
        "licensenumber": "4915570",
        "createdAt": "2024-03-20T23:16:56.633Z",
        "updatedAt": null
    },
    {
        "id": "7zag89hdbmu5",
        "publicId": "4uvpu66za47o",
        "companyname": "Tara-Sampath",
        "address": "61, RatanGarh, Pune - 568750",
        "companynumber": 366,
        "licensenumber": "964621379",
        "createdAt": "2024-03-20T23:17:29.691Z",
        "updatedAt": null
    },
    {
        "id": "ak2q80a60zl3",
        "publicId": "rcld0fnvpvmk",
        "companyname": "Dayal-Acharya",
        "address": "30, Richa Apartments, Andheri Meerut - 547761",
        "companynumber": 3780,
        "licensenumber": "4228",
        "createdAt": "2024-03-20T23:17:57.018Z",
        "updatedAt": null
    },
    {
        "id": "o55p3r971rdo",
        "publicId": "w3czzlhe5g5a",
        "companyname": "Behl-Gala",
        "address": "80, Babita Nagar, Jaipur - 309615",
        "companynumber": 4777,
        "licensenumber": "24924",
        "createdAt": "2024-03-20T23:18:25.185Z",
        "updatedAt": null
    },
    {
        "id": "yfwdk0q9uk7e",
        "publicId": "g89x3vfda5v7",
        "companyname": "Datta, Narayanan and Mander",
        "address": "12, Himesh Villas, Ram Gopal Chowk Simla - 128414",
        "companynumber": 29358,
        "licensenumber": "257240",
        "createdAt": "2024-03-20T23:18:52.902Z",
        "updatedAt": null
    },
    {
        "id": "g23umana4zlx",
        "publicId": "5k4x1crn2lkj",
        "companyname": "Saha-Sastry",
        "address": "39, Bagwati Heights, Deccan Gymkhana Bhubhaneshwar - 426578",
        "companynumber": 23,
        "licensenumber": "140140",
        "createdAt": "2024-03-20T23:19:17.865Z",
        "updatedAt": null
    }
    // ...
  ];

  if(data.companies.length!==0){
    data3.length=0;
    data3.push(...data.companies)
  }
 
  const table = createTable(readable(data3), {
    page: addPagination(),
    sort: addSortBy({ disableMultiSort: true }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    hide: addHiddenColumns(),
    select: addSelectedRows(),
  });
 
  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;
        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected,
        });
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);
 
        return createRender(DataTableCheckbox, {
          checked: isSelected,
        });
      },
      plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      accessor: "companyname",
      header: "Name",
    }),
    table.column({
      accessor: "companynumber",
      header: "Company No.",
    }),
    table.column({
      accessor: "licensenumber",
      header: "License No.",
    }),
    table.column({
      accessor: "address",
      header: "Address",
      // cell: ({ value }) => {
      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //   }).format(value);
      //   return formatted;
      // },
      plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      accessor: ({ publicId }) => publicId,
      header: "",
      cell: ({ value }) => {
        return createRender(DataTableActions, { id: value });
      },
      plugins: {
        sort: {
          disable: true,
        },
      },
    }),
  ]);
 
  const {
    headerRows,
    pageRows,
    tableAttrs,
    tableBodyAttrs,
    pluginStates,
    flatColumns,
    rows,
  } = table.createViewModel(columns);
 
  const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;
  const { selectedDataIds } = pluginStates.select;

 
  const ids = flatColumns.map((col) => col.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
 
  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);
 
  const hidableCols = ["address", "licensenumber", "companynumber"];
</script>
<div>
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter Companies..."
      type="text"
      bind:value={$filterValue}
    />
    <Button variant="outline" class="ml-auto">
      <a href="Companies/add">Add a new Company</a>
    </Button>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" class="ml-auto" builders={[builder]}>
          Columns <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#each flatColumns as col}
          {#if hidableCols.includes(col.id)}
            <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
              {col.header}
            </DropdownMenu.CheckboxItem>
          {/if}
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe
                  attrs={cell.attrs()}
                  let:attrs
                  props={cell.props()}
                  let:props
                >
                  <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                    {#if cell.id === "address"}
                      <div class="text-right">
                        <Render of={cell.render()} />
                      </div>
                    {:else if cell.id === "companynumber"||cell.id === "licensenumber"||cell.id==="companyname"}
                      <Button variant="ghost" on:click={props.sort.toggle}>
                        <Render of={cell.render()} />
                        <ArrowUpDown class={"ml-2 h-4 w-4"} />
                      </Button>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row
              {...rowAttrs}
              data-state={$selectedDataIds[row.id] && "selected"}
            >
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs} class="[&:has([role=checkbox])]:pl-3">
                    {#if cell.id === "amount"}
                      <div class="text-right font-medium">
                        <Render of={cell.render()} />
                      </div>
                    {:else if cell.id === "status"}
                      <div class="capitalize">
                        <Render of={cell.render()} />
                      </div>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-4 py-4">
    <div class="flex-1 text-sm text-muted-foreground">
      {Object.keys($selectedDataIds).length} of{" "}
      {$rows.length} row(s) selected.
    </div>
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>