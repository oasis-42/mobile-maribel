import CardConfig from "./CardConfig"

const dataConfig = [{
    id_config: 1,
    title_config: 'Gerar pontuação',
    describe_config: 'Permita que a inteligência artificial gere uma provável nota referente a redação',
    check_config: false
}, {
    id_config: 2,
    title_config: 'Habilitar correção expandida',
    describe_config: 'Permita que a inteligência artificial tenha considerações extras, mas com uma taxa de assertividade menor',
    check_config: false
}, {
    id_config: 3,
    title_config: 'Permitir Notificação',
    describe_config: 'Receba lembretes com base em sua rotina de estudos na aplicação',
    check_config: false
}]


export function ConfigList() {

    return <>
        {dataConfig.map((item, index) => (
            <CardConfig
                title={item.title_config}
                describe={item.describe_config}
                check={item.check_config}
            />
        ))}
    </>
}