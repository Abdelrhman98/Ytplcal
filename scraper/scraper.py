import re
import requests
from bs4 import BeautifulSoup




def getplid(url="playlist?list=PLDcmCgguL9rxTEz1Rsy6x5NhlBjI8z3Gz&disable_polymer=true"):
    """
    getplid [summary]
    
    Parameters
    ----------
    url : str
        the initial function to get the playlist id from the submitted url
        the url might use the new polymer design which is a little complex for a scraper
        so I use the extracted id from the regex to make my own url to scrap with.
        the default value is just for testing purposes
        , by default "playlist?list=PLDcmCgguL9rxTEz1Rsy6x5NhlBjI8z3Gz&disable_polymer=true"
    """
    try:
        id = re.search('list=(.*?)&', url).group(1)
    except AttributeError:
        id = 'NotFound'
    url = "https://www.youtube.com/playlist?list=%s&disable_polymer=true" % id
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    alltimestamps = soup.find_all("div", { "class" : "timestamp" })
    timestamps=[]
    for time in alltimestamps:
        duration = str(time.find('span').get_text())
        duration=duration.replace(':','.')
        duration = float(duration)
        timestamps.append(duration)

    print(timestamps)
    print(sum(timestamps[2:50]))
    loadmore = soup.find_all('button',{'class': 'load-more-button'})

if __name__ == "__main__":
    getplid()