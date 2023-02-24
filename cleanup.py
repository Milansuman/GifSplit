import os
import datetime


def clear_cache(folder:str, time_filter:int):
    cached_files = os.listdir(folder)

    for file in cached_files:

        #delete file if it is older than specified
        if ( datetime.datetime.now().timestamp() - os.path.getatime(os.path.join(folder, file)) ) > time_filter:
            os.remove(os.path.join(folder, file))
