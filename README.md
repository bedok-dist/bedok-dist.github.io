# bedok-dist.github.io
https://bedok-dist.github/ webapp (in-progress)

# Jak użyć?

1. Stwórz plik html, a w nim:

```html
<head>
    <script>
      function defineModule(name, buildModule) {
        window.BedokWrapper = buildModule()
      }
    </script>
    <script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js"></script>
    <script src="https://unpkg.com/firebase@7.6.1/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-database.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.js"></script>
    <script src="https://bedok-dist.github.io/wrapper.js"></script>
</head>
<body>
    <div id="app"></div>
    <script id="x-app" type="text/x-template">
      <div class="lg:max-w-[1000px] border border-[white] mx-auto">
        <bedok-wrapper :page.sync="page">
  
          <template #menu="{onRoute}">
            <button @click.prevent="() => onRoute(1)">Strona główna</button>
            <button @click.prevent="() => onRoute(2)">Lista ogłoszeń</button>
          </template>

          <template #adslist="{ads, createAd, newModel, removeAd, isLoading, openAdDetails}">
            <h2>Lista ogłoszeń</h2>
            <ul>
              <li v-if="isLoading">Trwa wczytywanie</li>
              <li v-else v-for="({id, data: ad}, index) in ads" :key="index" class="card1" style="display: unset;">
                <pre>{{ JSON.stringify(ad, null, 2) }}</pre>
                <button @click="removeAd(id)" title="remove">x</button>
                <button @click="openAdDetails({id, data: ad})">otwórz</button>
              </li>
            </ul>
          </template>

        </bedok-wrapper>
      </div>
    </script>
    <script>
    new Vue({
      components: {
        BedokWrapper,
      },
      template: '#x-app',
      el: '#app',
      data() {
        return {
          page: 1,
          window,
        }
      },
    })
    </script>
</body>
```

2. Dodaj dodatkowe widoki

```diff

        <bedok-wrapper :page.sync="page">
  
          <template #menu="{onRoute}">
            <button @click.prevent="() => onRoute(1)">Strona główna</button>
            <button @click.prevent="() => onRoute(2)">Lista ogłoszeń</button>
          </template>

          <template #adslist="{ads, createAd, newModel, removeAd, isLoading, openAdDetails}">
            <h2>Lista ogłoszeń</h2>
            <ul>
              <li v-if="isLoading">Trwa wczytywanie</li>
              <li v-else v-for="({id, data: ad}, index) in ads" :key="index" class="card1" style="display: unset;">
                <pre>{{ JSON.stringify(ad, null, 2) }}</pre>
                <button @click="removeAd(id)" title="remove">x</button>
                <button @click="openAdDetails({id, data: ad})">otwórz</button>
              </li>
            </ul>
          </template>
  
+        <!-- Widok szczegółów ogłoszenia -->
+          <template #details="{ ad }">
+            <h2>Szczegóły ogłoszenia</h2>
+            <button @click="page = 1">powrót</button>
+            <pre>{{JSON.stringify(ad, null, 2)}}</pre>
+          </template>

+          <!-- Widok strony głównej wyświetlającej 30 przykładowych ogłoszeń -->
+          <template #mainpage="{first30Ads, openAdDetails, createAd, newModel}">
+            <h1>Strona główna</h1>
+            <h2 title="30 najnowszych ogłoszeń">Najnowsze ogłoszenia</h2>
+            <div v-if="!first30Ads.length">Brak ogłoszeń</div>
+            <ul v-else>
+              <li v-for="ad in first30Ads" class="card">
+                {{ad.data}}<br/>
+                <button @click="openAdDetails(ad)">otwórz</button>
+              </li>
+            </ul>
+            <br/>
+            <button @click="() => window.dialog.showModal()">dodaj nowe ogłoszenie</button>
+            <dialog id="dialog">
+              <button @click="window.dialog.close()">x</button>
+              <form method="dialog" @submit="() => {createAd(newModel)}">
+                <input type="text" v-model="newModel.title" placeholder="tytuł"><br>
+                <input type="text" v-model="newModel.city" placeholder="miasto"><br>
+                <input type="text" v-model="newModel.price" placeholder="cena"><br>
+                <button type="submit">Dodaj</button>
+              </form>
+            </dialog>
+          </template>

        </bedok-wrapper>
```

