export default class {
  name
  publicId
  photos
  reviews
  testimonials
  editorialReview
  address
  location
  insuranceAccepted
  showPricingToCustomer
  ageRangeSpecializations
  createdAt
  updatedAt
  treatmentPhilosophy
  pressMediaLinks
  treatmentLinks
  category
  programTypes
  timeZone
  treatmentTypes
  popularity
  staff
  specializations
  financingAvailable
  genderRestrictions
  highlights
  environmentalSetting
  ratings
  constructor(data) {
    Object.assign(this, this.camel(data))
    this.fixPhone()
    this.fixPhotos()
  }

  fixPhone() {
    let i
    const results = []
    if (this.phone !== undefined && this.phone) {
      for (i = 0; i < this.phone.length; i++) {
        if (!this.phone[i].description.includes('Track')) {
          results.push(this.phone[i])
        }
      }
      this.phone = results
    }
  }

  get DefaultLink() {
    return this.domainSlugs.rehabs
  }

  fixPhotos() {
    let i
    const results = []
    if (this.photos !== undefined) {
      if (this.photos.length > 0) {
        for (i = 0; i < this.photos.length; i++) {
          if (!this.photos[i].fileName.includes('cdn')) {
            results.push(this.photos[i])
          }
        }
        this.photos = results
        if (results === undefined || results === null) {
          this.photos = null
        }
      }
    }
  }

  get hasDefaultPhoto() {
    return this.photos !== undefined
  }

  get DefaultPhoto() {
    if (this.photos) {
      if (this.photos.length) {
        return this.photos[0].fileName
      }
    }
    return null
    // return this.photos[0].fileName
  }

  camel(listing) {
    const toCamel = (str) => {
      return str.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '')
      })
    }

    const isObject = function (obj) {
      return (
        obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
      )
    }

    const keysToCamel = function (obj) {
      if (isObject(obj)) {
        const n = {}

        Object.keys(obj).forEach((k) => {
          n[toCamel(k)] = keysToCamel(obj[k])
        })

        return n
      } else if (Array.isArray(obj)) {
        return obj.map((i) => {
          return keysToCamel(i)
        })
      }

      return obj
    }
    return keysToCamel(listing)
  }
}
