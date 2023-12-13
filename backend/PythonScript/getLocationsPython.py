import googlemaps
from geopy.geocoders import GoogleV3

api_key = 'AIzaSyC-n_YHaxbxsghNiqSMKoLxMvdEDVpm6kg'
gmaps = googlemaps.Client(key=api_key)

def get_zip_code_from_lat_lng(latitude, longitude, api_key=api_key):
    geolocator = GoogleV3(api_key=api_key)
    location = geolocator.reverse((latitude, longitude), language='en')
    
    if location:
        address_components = location.raw.get('address_components', [])

        zip_code = next((component['long_name'] for component in address_components
                         if 'postal_code' in component['types']), None)

        if zip_code:
            return zip_code
        else:
            return 'ZIP Code not found.'
    else:
        return 'Location not found.'



def get_current_location():
    try:
        location = gmaps.geolocate()

        # print("Latitude:", location['location']['lat'])
        # print("Longitude:", location['location']['lng'])

        result = get_zip_code_from_lat_lng(location['location']['lat'], location['location']['lng'])
        print(result)


    except Exception as e:
        print("Error:", e)




if __name__ == "__main__":
    get_current_location()
