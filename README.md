# bedok-dist.github.io
https://bedok-dist.github/ webapp (in-progress)

# Jak użyć?

1. Stwórz plik html, a w nim:

```html
<head>
    <script>
      function defineModule(name, buildModuleBuilder) {
        window.bedokWrapperPluginBuilder = buildModuleBuilder()
      }
    </script>
    <script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js"></script>
    <script src="https://unpkg.com/firebase@7.6.1/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-database.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.js"></script> -->
    <script src="https://unpkg.com/vue@3.3.8"></script>
    <script src="https://bedok-dist.github.io/wrapper.js"></script>
</head>
<body>
    <div id="app"></div>
    <script id="x-app" type="text/x-template">
      <div class="lg:max-w-[1000px] border border-[white] mx-auto">
        <bedok-wrapper v-model:page="page">
  
          <template #menu="{onRoute}">
            <button @click.prevent="() => onRoute(1)">Strona główna</button>
            <button @click.prevent="() => onRoute(2)">Lista ogłoszeń</button>
          </template>

          <template #adslist="{ads, createAd, newModel, removeAd, isLoading, openAdDetails}">
            <h2>Lista ogłoszeń</h2>
            <ul>
              <li v-if="isLoading">Trwa wczytywanie</li>
              <li v-else v-for="(ad, index) in ads" :key="index" class="card1" style="display: unset;">
                <pre>{{ JSON.stringify(ad, null, 2) }}</pre>
                <button @click="removeAd(id)" title="remove">x</button>
                <button @click="openAdDetails(ad)">otwórz</button>
              </li>
            </ul>
          </template>

        </bedok-wrapper>
      </div>
    </script>
    <script>
    const appDef = ({
      components: {
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
    Vue.createApp(appDef).use(window.bedokWrapperPluginBuilder(Vue)).mount(appDef.el) // vue3
    // Vue.version[0]==='3' ? Vue.createApp(appDef).mount(appDef.el) : new Vue(appDef) // both vue2 and vue3
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
              <li v-else v-for="(ad, index) in ads" :key="index" class="card1" style="display: unset;">
                <pre>{{ JSON.stringify(ad, null, 2) }}</pre>
                <button @click="removeAd(id)" title="remove">x</button>
                <button @click="openAdDetails(ad)">otwórz</button>
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

4. menu

```diff
        <template #menu="{ onRoute, token, notifications }">
          <button @click.prevent="() => onRoute(1)">Strona główna</button>
          <button @click.prevent="() => onRoute(2)">Lista ogłoszeń</button>
+          <button @click="() => onRoute('login')" v-if="!token">Zaloguj</button>
+          <button @click="() => {onRoute(10), onLogout()}" v-else>Wyloguj</button>
        </template>
```

5. logowanie automatycznie zapisze token do `localStorage.token`

5. ekran logowania

ekran logowania (w src tego demka) jest połączony z ekranem rejestracji poprzez współdzielenie pól.
Po zalogowaniu przechdzimy do `adslist`.
Jeśli rozwiniemy `details`, to pojawia się pole `phone` i dodatkowy przycisk, który dzięki `.prevent` nie wywoła nadrzędnego `form.submit`.
Oczywiście docelowa implementacja tak wyglądać nie może, ten przykład tylko pokazuje kiedy i jak wywoływać `onLogin` i `onRegister`.

```diff
        <template #login="{ onRoute, apiClient, token, form, onLogin, onRegister }">
+          <form @submit.prevent="(ev) => onLogin(form, token).then((t) => {onRoute('adslist');})">
            <h1>Zaloguj się</h1>
            <input v-model="form.email" placeholder="E-mail"/>
            <br>
            <input v-model="form.password" placeholder="Hasło"/>
            <br>
            <input type="submit" value="Zaloguj"/>
            <details>
              <summary>Zarejestruj</summary>
              <p>Podaj jedno pole więcej i możesz się zarejestrować (powyższe pola są współdzielone)</p>
              <div>
                <input v-model="form.phone" placeholder="Nr telefonu"/>
                <br>
+                <button @click.prevent="(ev) => onRegister(form, {fullObj: true}).then((res) => {debugger; if (res.id) {onRoute('login'); window.alert('ok'); form.phone = ''} else window.alert('err');})">Zarejestruj się</button>
              </div>
            </details>
          </form>
        </template>
```

6. dodanie ogłoszenia

Dodanie ogłoszenia operuje na wstsrzykiwanej wartości `newModel` (model nowego ogłoszenia, nazwa niefortuna, zostanie `@deprecated`).
newModel przyjmuje wartość przykładowego ogłoszenia, które możemy edytować jako json. Zmiana treści `pre` po odznaczeniu zapisze nowy sparsowany obiekt do pamięci, natomiast po kliknięciu przycisku wykonywana jest metoda `createAd` (ma podstawową obsługę błędów, w przypadku sukcesu przechodzi do `adslist`)

```diff
        <template #adcreate="{createAd, newModel, onRoute}">
+          <form @submit.prevent="() => {createAd(newModel)}">
            <pre contenteditable @blur="ev => {newModel = JSON.parse(ev.target.textContent)}">{{ JSON.stringify(newModel, null, 2) }}</pre>
            <button>dodaj</button>
          </form>
        </template>
```

Tak dodane ogłoszenie powinno pojawić się zarówno w `mainpage` jak i `adslist`.

7. profil + lista ogłoszeń w profilu (potrzebne do edycji ogłoszeń)

żebyśmy mogli edytować ogłoszenie, najpierw musimy wiedzieć, które są możliwe do edycji - wyświetlenie profilu

dodanie do menu

```diff

        <template #menu="{ onRoute, token, onLogout, notifications, onLogin }">
          <button @click.prevent="() => onRoute(1)">Strona główna</button>
          <button @click.prevent="() => onRoute((2, 'adslist'))">Lista ogłoszeń</button>
+          <button v-if="token" @click.prevent="() => onRoute('profile')" :disabled="!token">Mój profil</button>
        </template>
```

dodanie slotu

```diff
        <template #profile="{ onRoute, apiClient, token, myAds, myData, updateAd, tempAds, editAd, editAdId }">
          <details open>
            <summary>Dane mojego profilu:</summary>
            <pre>{{
              JSON.stringify(myData, null, 2)
            }}</pre>
          </details>
          <details open>
            <summary>Moje ogłoszenia (jako host):</summary>
            <div>
              <ul>
+                <li v-for="(e, i) in myAds">
                  <pre contenteditable>{{
                    JSON.stringify(e, null, 2)
                  }}</pre>
                  <button @click="editAd(e.id || e.advertisementId)">edytuj</button>
                  <button @click="apiClient.deleteAdById(e.id || e.advertisementId).then(res => window.alert(JSON.stringify(res)))">usuń</button>
                </li>
+                <li v-if="!myAds.length">brak twoich ogłoszeń <button @click="onRoute('adcreate')">dodaj jakieś</button></li>
              </ul>
            </div>
          </details>
        </template>
```

8. edytowanie ogłoszenia

updateAd - funkcja aktualizująca ogłoszenie
ad - obecnie edytowane ogłoszenie (POJO)
editAdId - `id` obecnie edytowanego ogłoszenia (na dzień dzisiejszy nie ma id w obiekcie z danymi, dlatego zapisujemy go w momencie wejścia do ekranu edycji `adedit`)

```diff
        <template #adedit="{updateAd, ad, editAdId}">
          <div>
            <button @click="page = 'adslist'">powrót</button>
            <pre contenteditable @blur="ev => {ad = JSON.parse(ev.target.textContent)}">{{
              JSON.stringify(ad, null, 2)
            }}</pre>
+            <button @click="() => updateAd(e?.id || e?.advertisementId || editAdId, ad)">zapisz</button>
          </div>
        </template>
```

9. notyfikacje

Notyfikacje są zaimplementowane (do integracji) w bardzo przyjemny sposób i dodaje się je tak (póki co dostępne jedynie w miejscu #menu).
Oczywiście dialog tylko informacyjnie, w docelowej implementacji tam trzeba popover/dropdown.

Ważne: zauważmy, że należy wyświetlać notyfiakcje, jeśli jest `token` (jesteśmy zalogowani).

```diff
        <template #menu="{ onRoute, token, onLogout, notifications, onLogin }">
          <button @click.prevent="() => onRoute(1)">Strona główna</button>
          <button @click.prevent="() => onRoute((2, 'adslist'))">Lista ogłoszeń</button>
          <button v-if="token" @click.prevent="() => onRoute('profile')" :disabled="!token">Mój profil</button>
          <button @click="() => onRoute(9)" v-if="!token">Zaloguj</button>
          <button @click="() => {onRoute(10), onLogout()}" v-else>Wyloguj</button>
+          <button v-if="token" @click="window.notifs.show()" :title="JSON.stringify(notifications, null, 2)">🔔 ({{ notifications?.length }})</button>
+          <dialog id="notifs">
+            <ul>
+              <li v-for="e in notifications">{{ JSON.stringify(e) }}</li>
+              <li v-if="!notifications?.length">brak notyfikacji</li>
+            </ul>
+            <button @click="window.notifs.close()">x</button>
+          </dialog>
        </template>
```

10. TODO reset pass, change pass, photos (ad, profile) list + edit

11. TODO register slot

12. TODO onReserve, onLogout, deleteReserve, uploadPhoto, offline-mode (double click background, localStorage.mockedapi=1)

CHANGELOG 2024-10-01:

  - saving to localstorage
  - confirm to enable mockapi
  - fix saving an ad (no `v-for` element `e`, use `ad?.id`)

13. TODO, createReservations, openAdDetails

14. loading view from location.hash, openaddetails load data, updating router view, use string view names rather than numbers, v-if=ad.data for loading, updateAd error signaling
