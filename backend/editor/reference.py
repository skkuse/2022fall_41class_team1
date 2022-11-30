from selenium import webdriver
from selenium.webdriver.common.by import By

def crawling_link(key_word):
    
    #headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}
    youtube_url = "https://www.youtube.com/results?search_query=" + key_word
    beakjun_url = "https://www.acmicpc.net/search#q=" + key_word + "&c=Problems"
    wiki_url = "https://ko.wikipedia.org/w/index.php?search=" + key_word

    options = webdriver.ChromeOptions()
    options.add_argument("headless")
    browser = webdriver.Chrome(options=options)

    browser.get(youtube_url)
    element = browser.find_element(By.XPATH,'/html/body/ytd-app/div[1]/ytd-page-manager/ytd-search/div[1]/ytd-two-column-search-results-renderer/div[2]/div/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-video-renderer[1]/div[1]/ytd-thumbnail/a')
    href = element.get_attribute('href')
    youtube_url = href

    browser.get(beakjun_url)
    element = browser.find_element(By.XPATH,'//*[@id="result"]/div[3]/div[1]/h3/a')
    href = element.get_attribute('href')
    beakjun_url = href
    
    return {'youtube':youtube_url,'beakjun':beakjun_url,'wiki':wiki_url}

if __name__ == "__main__":
    ret = crawling_link("DFS")
    print(ret['youtube'])
    print(ret['beakjun'])
    print(ret['wiki'])