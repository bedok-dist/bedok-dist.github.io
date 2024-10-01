{
    let token = window.localStorage['token'] ?? 'abc123'

    window.translateRoute = r => {
      debugger
      return r
    }
  
    window.addEventListener("popstate", (event) => {
      console.info(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
    });
  
    const map = {
      no_linen1:  "no_linen1",
      washer1:  "washer1",
      radio1:  "radio1",
      wifi1:  "wifi1",
      window1:  "window1",
      balcony1:  "balcony1",
      air_conditioning1:  "air_conditioning1",
      tv1:  "tv1",
      table1:  "table1",
      bathroom1:  "bathroom1",
      chair2:  "chair2",
      table2:  "table2",
      wardrobe2:  "wardrobe2",
      duvet2:  "duvet2",
      blanket2:  "blanket2",
      roller_blinds2:  "roller_blinds2",
      tv2:  "tv2",
      others2:  "others2",
      tv3:  "tv3",
      oven3:  "oven3",
      radio3:  "radio3",
      wifi3:  "wifi3",
      sofa3:  "sofa3",
      table3:  "table3",
      dishes3:  "dishes3",
      pan3:  "pan3",
      hair_dryer3:  "hair_dryer3",
      bathRoom3:  "bathRoom3",
      iron3:  "iron3",
      tv4:  "tv4",
      washer4:  "washer4",
      radio4:  "radio4",
      wifi4:  "wifi4",
      window4:  "window4",
      balcony4:  "balcony4",
      airConditioning4:  "airConditioning4",
      tv4:  "tv4",
      ventilation4:  "ventilation4",
      bathRoom4:  "bathRoom4",
      showe4:  "showe4",
      toilet5:  "toilet5",
      coffee_machine5:  "coffee_machine5",
      sensor5:  "sensor5",
      icon_vacuum_cleaner5:  "icon_vacuum_cleaner5",
      other5:  "other5"
    }

    const ads = window.ads = [
      // {
      //   title: 'mieszkanie',
      // },
      {
        "advertisementId": "2c4dfa24-f2f7-4d92-87c8-f7d902e86ac0",
        "hostId": "7c4de008-371f-491f-8339-272f94d8bd1f",
        "title": "Even [uk]cosier[/uk][us]cozier[/us] apartment",
        "city": null,
        "district": null,
        "numBeds": 1,
        "description": null,
        "roomGender": null,
        "guests": [],
        "price": 1.0,
        "street": null,
        "roomArea": 1.0,
        "userResponse": {
          "name": "John Doe",
          "id": "7c4de008-371f-491f-8339-272f94d8bd1f",
          "email": "john.doe@example.com",
          "phone": "+1234567891",
          "gender": "MALE"
        },
        "mainPhotos": [
          "http://167.86.70.65:9000/bedok/advertisement/a80455b8-7528-4889-a211-4eb34004bcfe/OIP%20-%20Copy.jfif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=your-admin%2F20240731%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240731T154116Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=968b9b9df27568296b7a41ac8b08fc96c727d245da41aa976e257f64f6055165",
          "http://167.86.70.65:9000/bedok/advertisement/a80455b8-7528-4889-a211-4eb34004bcfe/man.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=your-admin%2F20240731%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240731T154116Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=278440cba0066c7f4ab15ade8d92a27906fb444aead4d6ed1fa4df4bc8811908",
          "http://167.86.70.65:9000/bedok/advertisement/a80455b8-7528-4889-a211-4eb34004bcfe/man2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=your-admin%2F20240731%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240731T154116Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b49f42f720c015bd27a0555e0b64591902f816ec4da028e47615111dad124652"
        ],
        // features
        "sharedEquipment--see-mockapi": [] ?? [
          "no_linen",
          "washer",
          "radio",
          "wifi",
          "window",
          "balcony",
          "air_conditioning",
          "tv",
          "table",
          "bathroom",
          "chair",
          "table",
          "wardrobe",
          "duvet",
          "blanket",
          "roller_blinds",
          "tv",
          "others",
        ],
        "roomEquipment--see-mockapi": [] ?? [
          "no_linen",
          "washer",
          "radio",
          "wifi",
          "window",
          "balcony",
          "air_conditioning",
          "tv",
          "table",
          "bathroom",
          "chair",
          "table",
          "wardrobe",
          "duvet",
          "blanket",
          "roller_blinds",
          "tv",
          "others"
        ],
        "televisionRoom": true,
        "televisionShared": true,
        "bathroom": true,
        ...1?{}:{
        "ironRoom": false,
        "hooverRoom": false,
        "televisionRoom": false,
        "radioRoom": false,
        "balconyRoom": false,
        "bathroom": false,
        "ironShared": false,
        "hooverShared": false,
        "televisionShared": false,
        "radioShared": false,
        "balconyShared": false,
        },
        "active": true
      },
    ]

  let isLoadOk = false
  function loadAdsFromLocalStorage() {
    try {
      const loadedAds = JSON.parse(localStorage['ads'])
      ads.splice(0, ads.length)
      ads.push(...loadedAds)
      isLoadOk = true
    } catch (e) {
      console.error('[mockapi] LOCALSTORAGE: error in loading ads from the localstorage')
    }
  }
  loadAdsFromLocalStorage()

  function saveAds(ads = window.ads) {
    if (!isLoadOk) {
      debugger
    }
    window.localStorage.setItem('ads', JSON.stringify(ads, null, 2))
  }

    function adAvailableSince(ad, form) {
      return true
    }
    const notifs = [
      {id: 1},
      {id: 2},
    ]
    const reservations = []

    const flagsToFeatures = {
      // "ironRoom": "iron",
      // "hooverRoom": false,
      "televisionRoom": "tv",
      "radioRoom": "radio",
      "balconyRoom": "balcony",
      "bathroom": "bathroom",
    }
    const flagsToFeaturesShared = {
      "ironShared": "iron",
      // "hooverShared": false,
      "televisionShared": "tv",
      "radioShared": "radio",
      "balconyShared": "balcony",
    }
    const mapAdFromBackendToFrontend = ad => {
      return Object.assign(ad, {
        roomEquipment: Object.entries(flagsToFeatures).filter(([k, v]) => ad[k]).map(([k, v]) => v),
        sharedEquipment: Object.entries(flagsToFeaturesShared).filter(([k, v]) => ad[k]).map(([k, v]) => v),
        // ...ad,
      })
    }

    window['mockedApi'] = {
      login(form) {
        const resp = {
          token: 'abc123' + form['email'],
        }
        token = resp.token;
        return Promise.resolve(new Proxy(resp, {
          get(t, prop, rec) {
            console.info('accessing apiClient.login().then().', prop)
            // return { token, }
            // if (prop === 'token') {
            //   return 'abc123' + form['email']
            // }
            return t[prop]
          },
        }))
      },
      async findAds() {
        let _ads = await Promise.resolve(ads)
        _ads = _ads.map(e => {
          return mapAdFromBackendToFrontend(e) ?? e;
        })
        return _ads;
      },
      findNotifications() {
        return Promise.resolve(notifs)
      },
      createAd(data) {
        debugger
        const ad = {
          id: ads.length + 1e6|0,
          guests: [],
          ...data,
          isMine: true,
          hostId: token,
        }
        ad['advertisementId'] = ad.id
        ads.push(ad)
        saveAds(ads)
        return Promise.resolve({
          resp: {
            status: 200,
          },
          body: ad,
        });
      },
      createReserv(data) {
        debugger
        const ad = ads.find(e => e.advertisementId == data['advertisementId'])
        if (ad.isMine && ad.hostId === token) {
          window.alert('your own rsvp')
          throw 'rsvping your own'
        }
        if (ad.guests.length >= ad.numBeds) {
          window.alert('too many ppl')
          throw 'nope, too many ppl'
        }
        // TODO handle confirmation
        const data2 = {
          createdAd: new Date(),
          ...data,
          user: token,
        };
        if (ad) {
          ad.guests.push(data2)
        }
        saveAds()
        reservations.push(data2)
        return Promise.resolve(data2)
      },
      deleteReservation(data) {
        console.info('removing', data, 'from reservations')
        reservations.splice(reservations.indexOf(data), 1)
        const ad = ads.find(e => e.advertisementId == data['advertisementId'])
        ad.guests.splice(ad.guests.indexOf(data), 1)
        saveAds()
        return Promise.resolve(reservations)
      },
      findTenantReservations(...args) {
        // debugger
        // return Promise.resolve(reservations)
        return Promise.resolve(reservations.filter(e => e['user'] == token))
      },
      adDetailsById(id) {
        return Promise.resolve(ads.find(e => e['advertisementId'] == id || e.id == id))
      },
      updateAd(id, data) {
        debugger
        const ad = ads.find(e => e['advertisementId'] == id || e.id == id)
        if (ad.hostId !== token) {
          window.alert('not your ad, ui should not be even allowing this... but will let you do that')
          // throw 'cannot update not your own ad'
        }
        Object.assign(ad, data)
        saveAds()
        return Promise.resolve(ad)
      },
      async uploadAdPhoto(token, editAdId, adInput) {
        const ad = await this.adDetailsById(editAdId)
        return new Promise(async (res) => {
          // debugger
          ad.roomPhotos = ad.roomPhotos || []
          ad.mainPhotos = ad.mainPhotos || []
          const photo = {
            "data": "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
          }
          function getBase64(file) {
            return new Promise((res, rej) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function () {
                console.log('reader result', reader.result);
                res(reader.result)
              };
              reader.onerror = function (error) {
                console.log('Error: ', error);
                rej(error)
              };
            })
          }
          photo.data = await getBase64(adInput.files[0])
          ad.roomPhotos.push(photo)
          // ad.mainPhotos.push({photo: {data: 'data:image/png;base64,'+photo.data}})
          ad.mainPhotos.push({photo: {data: photo.data}})
          saveAds()
          res(ad)
        })
        debugger
      },
      async adPhotoDelete(token, ad_, photoIdx) {
        const ad = await this.adDetailsById(ad_.id ?? ad_.advertisementId ?? ad_)
        ad.mainPhotos.splice(photoIdx, 1)
        ad.roomPhotos.splice(photoIdx, 1)
        saveAds()
        return Promise.resolve(ad)
      },
      getMyAds() {
        return Promise.resolve(ads.filter(e => e.isMine))
      },
      adsSearch(form) {
        const nop = e => true
        return Promise.resolve(
          ads
          .filter(ad => {
            const is1 = form.city ? ad => ad.city == form.city : nop
            const is2 = form.cityDistance ? ad => ad.distanceFrom(form.city) <= form.cityDistance : nop
            const is3 = form.begin ? ad => adAvailableSince(ad, form.begin) : nop
            const is4 = form.end ? ad => adAvailableSince(ad, form.end) : nop
            const is5 = form.guests ? ad => ad.numBeds - ad.guests.length >= form.guests : nop
            const is6 = 'room has enought numBeds minus guests.length for given time window' // TODO
            const preds = [is1, is2, is3, is4, is5].map(e => e(ad))
            debugger;
            return preds.every(Boolean)
          })
          // .filter(form.city ? ad => ad.city == form.city : nop)
          // .filter(form.cityDistance ? ad => ad.distanceFrom(form.city) <= form.cityDistance : nop)
          // .filter(form.begin ? ad => adAvailableSince(ad, form.begin) : nop)
          // .filter(form.end ? ad => adAvailableSince(ad, form.end) : nop)
          // .filter(form.guests ? ad => ad.numBeds - ad.guests.length >= form.guests : nop)
        )
      },
      findAdsByHostId(hostId) {
        console.info('findAdsByHostId', hostId)
        const ads2 = ads.filter(a => a.hostId == hostId)
        return Promise.resolve(ads2);
      },
      deleteAdById(id) {
        // const arr = ads.filter(e => e.id !== id || e === id)
        // ads = arr;
        const removedAd = ads.splice(ads.findIndex(e => e.id !== id || e === id), 1)
        debugger
        saveAds()
        return Promise.resolve(ads);
      },
      findMyProfile() {
        const resp = {
          photo: {
            data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
            data: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
          },
        }
        return Promise.resolve(new Proxy(resp, {
          get(t, prop, rec) {
            console.info('accessing apiClient.findMyProfile().then().', prop)
            return t[prop]
          }
        }))
        return Promise.resolve({})
      },
      uploadPhoto(token, photoFileInput) {
        console.info('upload')
      },
      getCitiesSet() {
        return [...new Set(ads.map(e => e.city).filter(Boolean))]
      },
    };
  }
