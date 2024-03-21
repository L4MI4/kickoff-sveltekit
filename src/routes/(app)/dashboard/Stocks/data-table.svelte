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
 
  type Stocks = {
    id: string;
    publicId: string,
    medicinename: string,
    company_name: string,
    quantity: number,
    priceperunit: number,
    createdAt: string,
    expiryDate: string,
    updatedAt: string|null
  };
  console.log(data.stocks)
  const data3: Stocks[] = [
    {
        "id": "kjuzuxlhnrpe",
        "publicId": "lh13v3bcy49y",
        "medicinename": "Interfeterol Alcafvirenz",
        "quantity": 0,
        "company_name": "Pardeshi, Balan and Karpe",
        "priceperunit": 666,
        "expiryDate": "2024-12-31T01:18:11.000Z",
        "createdAt": "2024-03-21T10:35:09.825Z",
        "updatedAt": null
    },
    {
        "id": "yyq05q9x5gih",
        "publicId": "q4hwa8v1464l",
        "medicinename": "Abobotacept",
        "quantity": 6,
        "company_name": "Dua-Banerjee",
        "priceperunit": 569,
        "expiryDate": "2024-07-12T20:58:54.000Z",
        "createdAt": "2024-03-21T10:35:10.315Z",
        "updatedAt": null
    },
    {
        "id": "w2usro54wzs2",
        "publicId": "80e1zutablis",
        "medicinename": "Ageferol",
        "quantity": 2,
        "company_name": "Dhillon, Sekhon and Kakar",
        "priceperunit": 834,
        "expiryDate": "2025-04-14T11:45:06.000Z",
        "createdAt": "2024-03-21T10:35:10.854Z",
        "updatedAt": null
    },
    {
        "id": "hsumvu0t3msc",
        "publicId": "d19d8em4oens",
        "medicinename": "Agalsiprofen",
        "quantity": 4,
        "company_name": "Maharaj Group",
        "priceperunit": 745,
        "expiryDate": "2024-05-11T09:41:29.000Z",
        "createdAt": "2024-03-21T10:35:11.082Z",
        "updatedAt": null
    },
    {
        "id": "c0pvhyl5dc1y",
        "publicId": "fib6srqsnen3",
        "medicinename": "Adinil Alglusirox",
        "quantity": 7,
        "company_name": "Ramnarine, Brahmbhatt and Raj",
        "priceperunit": 558,
        "expiryDate": "2024-07-10T01:51:22.000Z",
        "createdAt": "2024-03-21T10:35:11.267Z",
        "updatedAt": null
    },
    {
        "id": "sns239e7wgwt",
        "publicId": "392f6gyon8tk",
        "medicinename": "Sensidosyn",
        "quantity": 9,
        "company_name": "Goswami Ltd",
        "priceperunit": 30,
        "expiryDate": "2024-11-30T18:56:27.000Z",
        "createdAt": "2024-03-21T10:35:11.268Z",
        "updatedAt": null
    },
    {
        "id": "n7r9e3hiwkp8",
        "publicId": "panlp57kc2pk",
        "medicinename": "Phytomab",
        "quantity": 0,
        "company_name": "Kota-Mammen",
        "priceperunit": 87,
        "expiryDate": "2024-12-18T13:53:10.000Z",
        "createdAt": "2024-03-21T10:35:11.271Z",
        "updatedAt": null
    },
    {
        "id": "v7a1w8mtxkiz",
        "publicId": "66bg7or1kjp2",
        "medicinename": "Fenoneva",
        "quantity": 8,
        "company_name": "Magar, Dey and Mani",
        "priceperunit": 877,
        "expiryDate": "2024-09-24T19:22:42.000Z",
        "createdAt": "2024-03-21T10:35:11.270Z",
        "updatedAt": null
    },
    {
        "id": "o6rxxjwxn0jn",
        "publicId": "bo3mx8xvupgs",
        "medicinename": "Cortitonin Hemaroban",
        "quantity": 3,
        "company_name": "Jaggi LLC",
        "priceperunit": 341,
        "expiryDate": "2025-06-12T22:32:35.000Z",
        "createdAt": "2024-03-21T10:35:11.270Z",
        "updatedAt": null
    },
    {
        "id": "muy3s8q0es4t",
        "publicId": "4o5hk8a2deec",
        "medicinename": "Amphetacept Clasulin",
        "quantity": 2,
        "company_name": "Ganesh, Gulati and Dass",
        "priceperunit": 237,
        "expiryDate": "2025-07-31T07:04:46.000Z",
        "createdAt": "2024-03-21T10:35:11.268Z",
        "updatedAt": null
    },
    {
        "id": "lzczb250nzet",
        "publicId": "eate40feliug",
        "medicinename": "Ganizolid",
        "quantity": 4,
        "company_name": "Mane LLC",
        "priceperunit": 545,
        "expiryDate": "2025-06-04T12:55:46.000Z",
        "createdAt": "2024-03-21T10:35:11.267Z",
        "updatedAt": null
    },
    {
        "id": "p9n47yls3sca",
        "publicId": "q6xakzk3yf7f",
        "medicinename": "Diarotec",
        "quantity": 9,
        "company_name": "Biswas, Rastogi and Hegde",
        "priceperunit": 945,
        "expiryDate": "2024-05-14T18:09:22.000Z",
        "createdAt": "2024-03-21T10:35:11.273Z",
        "updatedAt": null
    },
    {
        "id": "44kzretsebpr",
        "publicId": "h0zphl8apmz9",
        "medicinename": "Specpirox",
        "quantity": 8,
        "company_name": "Gala-Khatri",
        "priceperunit": 125,
        "expiryDate": "2025-08-31T00:00:19.000Z",
        "createdAt": "2024-03-21T10:35:11.273Z",
        "updatedAt": null
    },
    {
        "id": "nvy6mc1hokel",
        "publicId": "9pmpe8uu8h8h",
        "medicinename": "Amphetavarix Nizofine",
        "quantity": 5,
        "company_name": "Malpani LLC",
        "priceperunit": 975,
        "expiryDate": "2024-12-12T17:04:33.000Z",
        "createdAt": "2024-03-21T10:35:11.335Z",
        "updatedAt": null
    },
    {
        "id": "u0vvl2f2pj2i",
        "publicId": "uy2hmlp94rw2",
        "medicinename": "Suboracin Effitrana",
        "quantity": 0,
        "company_name": "Parsa-Malhotra",
        "priceperunit": 194,
        "expiryDate": "2025-04-25T08:10:05.000Z",
        "createdAt": "2024-03-21T10:35:11.337Z",
        "updatedAt": null
    },
    {
        "id": "vinh0u7yngbg",
        "publicId": "1bgvjupvre2y",
        "medicinename": "Omexapine",
        "quantity": 6,
        "company_name": "Mogul, Kunda and Dugal",
        "priceperunit": 890,
        "expiryDate": "2025-05-26T23:29:23.000Z",
        "createdAt": "2024-03-21T10:35:11.123Z",
        "updatedAt": null
    },
    {
        "id": "xffck3labife",
        "publicId": "qy7jssj666fo",
        "medicinename": "Afretaine",
        "quantity": 2,
        "company_name": "Ahluwalia-Bal",
        "priceperunit": 143,
        "expiryDate": "2025-08-09T15:31:05.000Z",
        "createdAt": "2024-03-21T10:35:11.335Z",
        "updatedAt": null
    },
    {
        "id": "c2yae2uw7zl4",
        "publicId": "vqrotj9k2g43",
        "medicinename": "Arteranon",
        "quantity": 8,
        "company_name": "Deol-Bobal",
        "priceperunit": 696,
        "expiryDate": "2025-03-04T04:25:12.000Z",
        "createdAt": "2024-03-21T10:35:11.336Z",
        "updatedAt": null
    },
    {
        "id": "bok2ouznjifa",
        "publicId": "452s5f3gnvy8",
        "medicinename": "Hydroxycept Acloronate",
        "quantity": 9,
        "company_name": "Muni, Prabhakar and Tata",
        "priceperunit": 659,
        "expiryDate": "2024-06-19T15:37:49.000Z",
        "createdAt": "2024-03-21T10:35:11.337Z",
        "updatedAt": null
    },
    {
        "id": "gdke2m2ovyct",
        "publicId": "47cqbbkm8y9t",
        "medicinename": "Requibucil",
        "quantity": 0,
        "company_name": "Maheshwari Group",
        "priceperunit": 60,
        "expiryDate": "2025-01-31T05:32:12.000Z",
        "createdAt": "2024-03-21T10:35:11.399Z",
        "updatedAt": null
    },
    {
        "id": "csdxtizm1anp",
        "publicId": "oty3x585x6fx",
        "medicinename": "Phytoletine",
        "quantity": 8,
        "company_name": "Parmer, Grover and Muni",
        "priceperunit": 290,
        "expiryDate": "2025-03-12T00:08:29.000Z",
        "createdAt": "2024-03-21T10:35:11.400Z",
        "updatedAt": null
    },
    {
        "id": "7ozglv31q5my",
        "publicId": "gmd89fw4x7mz",
        "medicinename": "Bonisin",
        "quantity": 8,
        "company_name": "Soman LLC",
        "priceperunit": 95,
        "expiryDate": "2025-09-20T05:48:21.000Z",
        "createdAt": "2024-03-21T10:35:11.401Z",
        "updatedAt": null
    },
    {
        "id": "e9krepmsma76",
        "publicId": "19ecmh3pxn5p",
        "medicinename": "Olanzaloride",
        "quantity": 1,
        "company_name": "Munshi, Desai and Tella",
        "priceperunit": 959,
        "expiryDate": "2024-11-05T22:13:28.000Z",
        "createdAt": "2024-03-21T10:35:11.403Z",
        "updatedAt": null
    },
    {
        "id": "g9862sl7l5zx",
        "publicId": "ex5cu53o67nq",
        "medicinename": "Sumagestin Azariva",
        "quantity": 1,
        "company_name": "Behl-Gala",
        "priceperunit": 28,
        "expiryDate": "2025-04-11T17:57:30.000Z",
        "createdAt": "2024-03-21T10:35:11.411Z",
        "updatedAt": null
    },
    {
        "id": "ikd1ywayvepq",
        "publicId": "1aryzpnbwrlt",
        "medicinename": "Inviferon Aquagomar",
        "quantity": 4,
        "company_name": "Dayal-Acharya",
        "priceperunit": 900,
        "expiryDate": "2024-05-25T10:17:35.000Z",
        "createdAt": "2024-03-21T10:35:11.413Z",
        "updatedAt": null
    },
    {
        "id": "dp4xrdkaj759",
        "publicId": "2ltgc65jgfi1",
        "medicinename": "Pancrelimus Neurostrel",
        "quantity": 5,
        "company_name": "Saha-Sastry",
        "priceperunit": 572,
        "expiryDate": "2025-08-26T11:17:44.000Z",
        "createdAt": "2024-03-21T10:35:11.429Z",
        "updatedAt": null
    },
    {
        "id": "2ls0rtkqacyg",
        "publicId": "fom719zwehfi",
        "medicinename": "Afinigestrel",
        "quantity": 9,
        "company_name": "Bora, Kulkarni and Nawal",
        "priceperunit": 321,
        "expiryDate": "2024-11-22T16:17:34.000Z",
        "createdAt": "2024-03-21T10:35:11.398Z",
        "updatedAt": null
    },
    {
        "id": "wfmkk0088xpv",
        "publicId": "awzraaekx7qv",
        "medicinename": "Ariramine Pralirabine",
        "quantity": 9,
        "company_name": "Dave-Ahuja",
        "priceperunit": 55,
        "expiryDate": "2025-01-02T23:26:21.000Z",
        "createdAt": "2024-03-21T10:35:11.398Z",
        "updatedAt": null
    },
    {
        "id": "rbblsywt3vq3",
        "publicId": "u38p5e06goax",
        "medicinename": "Tamofoxin",
        "quantity": 5,
        "company_name": "Tara-Sampath",
        "priceperunit": 926,
        "expiryDate": "2024-07-05T06:31:17.000Z",
        "createdAt": "2024-03-21T10:35:11.410Z",
        "updatedAt": null
    },
    {
        "id": "71kh25cgi6l7",
        "publicId": "e139lk0wsn5k",
        "medicinename": "Podotane Alkemycin",
        "quantity": 1,
        "company_name": "Datta, Narayanan and Mander",
        "priceperunit": 344,
        "expiryDate": "2025-02-06T18:37:45.000Z",
        "createdAt": "2024-03-21T10:35:11.415Z",
        "updatedAt": null
    }
]

  if(data.stocks.length!==0){
    data3.length=0;
    data3.push(...data.stocks)
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
      accessor: "medicinename",
      header: "Name",
    }),
    table.column({
      accessor: "company_name",
      header: "Company Name",
    }),
    table.column({
      accessor: "quantity",
      header: "Quantity",
    }),
    
    table.column({
      accessor: "priceperunit",
      header: "Price Per Unit",
      cell: ({ value }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "INR",
        }).format(value);
        return formatted;
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
      accessor: "expiryDate",
      header: "Expiry Date",
    }),
    table.column({
      accessor: ({ id }) => id,
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
 
  const hidableCols = ["expiryDate", "quantity", "medicinename","company_name"];
</script>
<div>
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter Stocks..."
      type="text"
      bind:value={$filterValue}
    />
    <Button variant="outline" class="ml-auto">
      <a href="Stocks/add">Add a new Stock</a>
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
                    {:else if cell.id === "company_name"||cell.id === "quantity"||cell.id==="priceperunit"||cell.id==="medicinename"}
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