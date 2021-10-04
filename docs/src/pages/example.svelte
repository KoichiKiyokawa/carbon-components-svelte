<script>
  import { DataTable } from "carbon-components-svelte";

  const rows = [
    { name: "user1", age: 10, gender: "male" },
    { name: "user2", age: 20, gender: "female" },
  ];
</script>

<DataTable
  rows="{rows}"
  headers="{[
    { key: 'name', value: 'Name' },
    { key: 'age', value: 'Age' },
    { key: 'gender', value: 'Gender' },
  ]}"
>
  <div slot="cell" let:cell let:row>
    {#if cell.key === "age"}{row.age}(years old){:else}{cell.value}{/if}
  </div>
</DataTable>
