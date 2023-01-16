<template>
  <div>
    <div class="ml-16">
      <ResourceHeader header="Products" />
      <!-- Table -->
      <div class="mt-6 box-border overflow-auto">
        <div class="flex flex-col">
          <div class="overflow-x-auto">
            <div class="flex justify-between py-3 pl-2">
              <SearchInput />
              <div class="flex text-sm">
                <PrimaryButton content="Add Product" />
              </div>
            </div>

            <div class="inline-block w-full p-1.5 align-middle">
              <div class="overflow-hidden rounded-lg border">
                <table class="table-fixed divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
                      >
                        SQ
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
                      >
                        Wholesale_price
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
                      >
                        Main image
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-bold uppercase text-gray-500"
                      >
                        Categories
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500"
                      >
                        Details
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500"
                      >
                        Edit
                      </th>

                      <th
                        scope="col"
                        class="px-6 py-3 text-right text-xs font-bold uppercase text-gray-500"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="product in products"
                    :id="product.id"
                    :key="product.id"
                    class="divide-y divide-gray-200"
                  >
                    <tr>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800"
                      >
                        {{ product.id }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.sq }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.name }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.price }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.wholesale_price }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.picture }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                      >
                        {{ product.categoryName }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                      >
                        <button
                          type="button"
                          class="text-gray-500 hover:text-gray-700"
                        >
                          <IconDetails />
                        </button>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                      >
                        <button
                          type="button"
                          class="text-green-500 hover:text-green-700"
                          @click="openEditProductModal(product.id)"
                        >
                          <IconEdit />
                        </button>
                      </td>

                      <td
                        class="whitespace-nowrap px-6 py-4 text-center text-sm font-medium"
                        @click="deleteProduct(product.id)"
                      >
                        <button
                          type="button"
                          class="text-red-500 hover:text-red-700"
                        >
                          <IconDelete />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit product form popup -->
  <div class="invisible" id="editProductModal">
    <div class="flex w-1/3 flex-col rounded border bg-green-100">
      <div class="mt-5 flex justify-around">
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Product Name:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Name"
            v-model="productName"
          />
        </div>
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">SQ:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="SQ"
            v-model="sq"
          />
        </div>
      </div>
      <div class="flex justify-around">
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Price:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Price"
            v-model="price"
          />
        </div>
        <div class="mb-4 px-2">
          <label class="mb-1 block text-sm">Wholesale Price:</label>
          <input
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            type="text"
            autofocus
            placeholder="Wholesale Price"
            v-model="wholesalePrice"
          />
        </div>
      </div>
      <div class="flex justify-around">
        <div class="px-2">
          <div class="flex flex-col items-center">
            <label class="mb-1 block text-sm">Image:</label>
            <input
              type="file"
              class="text-grey-500 text-sm file:mr-5 file:rounded-full file:border-0 file:bg-blue-50 file:py-2 file:px-6 file:text-sm file:font-medium file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
              accept="image"
              @change="pictureDisplayAndStore"
            />
          </div>
        </div>
        <div class="px-2">
          <div class="flex flex-col items-center">
            <label class="mb-1 block text-sm">Color:</label>
            <input
              type="text"
              class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
              placeholder="color"
              v-model="color"
            />
          </div>
        </div>
      </div>
      <div id="preview" class="mt-8 flex justify-center">
        <img v-if="imageUrl" :src="imageUrl" />
      </div>
      <!-- Select category -->
      <div>
        <div class="mb-4 flex px-2">
          <div class="mb-3 xl:w-96">
            <label>Select Category</label>
            <select
              id="categorySelection"
              class="form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              aria-label="Default select example"
              @change="getCategory()"
              v-model="selectedCategory"
            >
              <option hidden>Select Category</option>
            </select>
          </div>
        </div>
        <div class="mb-4 flex">
          <p>{{ this.selectedCategoriesArr }}</p>
        </div>
      </div>

      <div class="mb-4 px-2">
        <div class="flex flex-col">
          <label class="mb-1 block text-sm">Details:</label>
          <textarea
            type="text"
            class="focus:shadow-outline w-full rounded border px-4 py-2 outline-none focus:border-green-300"
            placeholder="specify details"
            v-model="details"
          ></textarea>
        </div>
      </div>
      <div class="mb-2 flex justify-around">
        <button
          class="rounded bg-green-500 py-2 px-3 font-bold text-white hover:bg-green-700"
          type="button"
          @click="editProduct()"
        >
          Save Changes
        </button>
        <button
          type="button"
          class="rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700"
          @click="closeEditProductModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconEdit from "../components/icons/IconEdit.vue";
import IconDelete from "../components/icons/IconDelete.vue";
import IconDetails from "../components/icons/IconDetails.vue";
import ResourceHeader from "../components/shared/ResourceHeader.vue";
import PrimaryButton from "../components/ui/buttons/PrimaryButton.vue";
import SearchInput from "../components/ui/inputs/SearchInput.vue";

export default {
  components: {
    SearchInput,
    IconEdit,
    IconDelete,
    IconDetails,
    ResourceHeader,
    PrimaryButton,
  },
  data() {
    return {
      products: [],
      categories: [],
      pivotData: [],
      categoryNames: [],
      selectedCategory: "",
      selectedCategoriesArr: [],
      selectedCategoryId: [],
      productId: "",
      productName: "",
      price: "",
      sq: "",
      wholesalePrice: "",
      color: "",
      details: "",
      image: "",
      imageUrl: "",
    };
  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((products) => {
        this.products = products;
      })
      .finally(() => {
        this.products.forEach((product) => {
          product.categoryName = [];
          this.categories.push(product.categories);
        });
        this.categories.forEach((category) => {
          category.forEach((item) => {
            this.pivotData.push([item.pivot, item.name]);
          });
        });
        this.pivotData.forEach((data) => {
          this.products.forEach((product) => {
            if (data[0].product_id == product.id) {
              product.categoryName.push(data[1]);
            }
          });
        });
      });
    // Get categories for editing Product
    const categorySelectionElement =
      document.getElementById("categorySelection");
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        categories.forEach((category) => {
          categorySelectionElement.innerHTML += `
            <option value=${category.id} id=${category.id}>${category.name}</option>
            `;
        });
      });
  },
  methods: {
    deleteProduct(id) {
      fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status == 204) {
          document.getElementById(`${id}`).remove();
        }
      });
    },
    editProduct() {
      // Sending request
      let formData = new FormData();
      formData.append("name", this.productName);
      formData.append("sq", this.sq);
      formData.append("color", this.color);
      formData.append("price", this.price);
      formData.append("wholesale_price", this.wholesalePrice);
      formData.append("details", this.details);
      formData.append("picture", this.image);
      // for (let i = 0; i < this.selectedCategoryId.length; i++) {
      //   formData.append("categories", this.selectedCategoryId[i]);
      // }

      // formData.forEach((data) => {
      //   console.log(data);
      // });

      // fetch(
      //   `http://127.0.0.1:8000/api/products/${this.productId}?_method=PUT`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       accept: "application/json",
      //     },
      //     body: formData,
      //   }
      // )
      //   .then((res) => {
      //     // console.log(res.json());
      //     // console.log(res.status);
      //   })
      //   .then(() => {
      //     // console.log(data);
      //   });
    },
    openEditProductModal(id) {
      document.getElementById("editProductModal").classList.remove("invisible");
      document.getElementById("editProductModal").classList.add("visible");
      // when opening edit category modal, current values are displayed
      this.productId = document
        .getElementById(id)
        .children.item(0)
        .children.item(0).innerHTML;
      this.sq = document
        .getElementById(id)
        .children.item(0)
        .children.item(1).innerHTML;
      this.productName = document
        .getElementById(id)
        .children.item(0)
        .children.item(2).innerHTML;
      this.price = document
        .getElementById(id)
        .children.item(0)
        .children.item(3).innerHTML;
      this.wholesalePrice = document
        .getElementById(id)
        .children.item(0)
        .children.item(4).innerHTML;
    },
    closeEditProductModal() {
      document.getElementById("editProductModal").classList.remove("visible");
      document.getElementById("editProductModal").classList.add("invisible");
    },

    // additional methods that help functionality
    pictureDisplayAndStore(e) {
      const file = e.target.files[0];
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    getCategory() {
      let selectedCategoryName = this.selectedCategory;
      let selectedCategoryId = this.selectedCategory.split(",")[0];
      this.selectedCategoriesArr.push(selectedCategoryName);
      this.selectedCategoryId.push(selectedCategoryId);
    },
  },
};
</script>

<style>
.invisible {
  display: none;
}
.visible {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
}
</style>
