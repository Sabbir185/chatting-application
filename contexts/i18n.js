import {createContext, useContext, useState} from "react"
import {useEffect} from "react";
import axios from "axios";
import {isArray} from "jsonexport/lib/core/helper";

const I18nContext = createContext({})
export const useI18n = () => useContext(I18nContext)
export default I18nContext


export const initI18n = () => {

    const [lang, setLang] = useState('en')
    const [direction, setDirection] = useState('ltr')
    const [translations] = useState({})
    const [languages, setLanguages] = useState()



    useEffect(() => {
        (async () => {
            let {data} = await axios.get(process.env.backend_url + 'api/settings/language/translations')
            let final = data.data;

            final?.map(d => {
                translations[d.key] = Object.keys(d.translation || {})?.reduce((acc, key) => {
                    acc[key] = d.translation[key]
                    acc[key.toLowerCase()] = d.translation[key]
                    return acc
                }, {})
            })
            setLanguages(final?.map(d => ({name: d.name, key: d.key, direction: d.direction})))
        })()
    }, [])

    useEffect(() => {
        if (languages) {
            let lang = localStorage.getItem('lang')
            if (lang) {
                changeLang(lang)
            }
        }
    }, [languages])

    useEffect(() => {
        document.documentElement.dir = direction
    }, [direction])

    const t = (key) => {
        if (!!key && translations['ar'] && !translations['ar'][key.toLowerCase()]) {
            let langKeys = localStorage.getItem('lang_keys')
            let data = !!langKeys ? JSON.parse(langKeys) : {}
            data[key.toLowerCase()] = ''
            localStorage.setItem('lang_keys', JSON.stringify(data))
        }

        return !!key && !!translations[lang] ? translations[lang][key.toLowerCase()] || key : key
    }

    const changeLang = key => {
        const lang = languages?.find(l => l.key === key)
        if (lang) {
            setLang(key)
            setDirection(lang.direction)
            localStorage.setItem('lang', key)
        }
    }

    return {
        languages,
        t,
        lang,
        direction,
        changeLang
    }
}