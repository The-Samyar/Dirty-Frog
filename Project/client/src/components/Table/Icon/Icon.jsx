import {
    MdBalcony, MdWifi, MdOutlineWaves, MdOutlineSafetyDivider, MdBathtub, MdIron, MdFitnessCenter,
    MdMonitor, MdOutlinePets, MdKitchen, MdVolumeOff
} from 'react-icons/md'
import { GiShower, GiTeapot, GiWoodBeam, GiBugNet, GiElectricalSocket } from 'react-icons/gi'
import { IoMdSnow } from 'react-icons/io'
import { FaGlassCheers, FaSwimmer, FaMountain, FaWind } from 'react-icons/fa'

export const Icon = ({ item }) => {
    const map1 = new Map([
        [1, IoMdSnow],
        [2, MdBalcony],
        [3, MdWifi],
        [4, MdOutlineWaves],
        [5, FaMountain],
        [6, GiShower],
        [7, MdOutlineSafetyDivider],
        [8, MdBathtub],
        [9, GiTeapot],
        [10, FaWind],
        [11, GiWoodBeam],
        [12, MdIron],
        [13, FaGlassCheers],
        [14, GiBugNet],
        [15, MdOutlinePets],
        [16, MdKitchen],
        [17, MdFitnessCenter],
        [18, FaSwimmer],
        [19, GiElectricalSocket],
        [20, MdVolumeOff],
        [21, MdMonitor]
    ]);

    const selectedIcon = map1.get(item)

    return selectedIcon ? selectedIcon() : null
}
