"""Initialization file for the crawler module."""
from .kkday import KKDayCrawler
# from .klook import KlookCrawler
# from .train import TrainCrawler
# from .flight import FlightCrawler
from .booking import BookingCrawler
from .inline import InlineCrawler
from .TaiwanRailway import TaiwanRailwayCrawler
from .TaiwanHighSpeedRail import TaiwanHighSpeedRailCrawler

crawler_map = {
    'kkday': KKDayCrawler,
    'booking': BookingCrawler,
    'inline': InlineCrawler,
    'twr': TaiwanRailwayCrawler,
    'thsr': TaiwanHighSpeedRailCrawler,
}
