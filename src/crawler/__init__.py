"""Initialization file for the crawler module."""
from .kkday import KKDayCrawler
# from .klook import KlookCrawler
# from .train import TrainCrawler
# from .flight import FlightCrawler
from .booking import BookingCrawler

crawler_map = {
    'kkday': KKDayCrawler,
    'booking': BookingCrawler,
    # 'klook': KlookCrawler,
    # 'train': TrainCrawler,
    # 'flight': FlightCrawler,
}
