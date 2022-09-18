import { ArrowClockwise, CaretDown, CaretUp, Check, GameController } from 'phosphor-react';
import { Input } from './Form/input';
import { useEffect, useState, FormEvent } from 'react';


import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';


interface Game {
    id: string;
    title: string;
}

export function CreatAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);
    const [gameId, setGameId] = useState<string>();

    useEffect(() => {
        axios('http://localhost:3030/games')
            .then(response => {
                setGames(response.data)
            });
    }, []);

    async function hadleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        // TODO - Validação

        try {
            await axios.post(`http://localhost:3030/games/${gameId}/ads`, {
                "name": data.name,
                "weekDays": weekDays.map(wd => Number(wd)),
                "discord": data.discord,
                "useVoiceChannel": useVoiceChannel,
                "yearsPlaying": Number(data.yearsPlaying),
                "hourStart": data.hourStart,
                "hourEnd": data.hourEnd
            });

            alert('Anúncio criado com sucesso!')
        } catch (error) {
            alert('Erro ao criar anúncio.')
            console.log(error)
        }



    }
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                    <Dialog.Title className='text-4xl font-black'>Publique um anúncio</Dialog.Title>

                    <form onSubmit={hadleCreateAd} className='mt-8 flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor='game'>Qual o game?</label>
                            {/* <Input
                                id='game'
                                placeholder='Selecione o game que deseja'
                                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' /> */}

                            <Select.Root onValueChange={setGameId}>
                                <Select.Trigger className='bg-zinc-900 flex flex-row gap-2 text-zinc-400 items-center justify-between py-3 px-4 rounded text-sm placeholder:text-zinc-500  '> {/*inline-flex align-middle justify-center*/}
                                    <Select.Value placeholder='Selecione o game que deseja' />
                                    <Select.Icon>
                                        <CaretDown size={24} className='text-zinc-400' />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content className='bg-zinc-900 overflow-hidden rounded shadow-sm shadow-black/40'>
                                        <Select.ScrollUpButton className='flex align-middle justify-center'>
                                            <CaretUp size={24} className='text-zinc-400' />
                                        </Select.ScrollUpButton>

                                        <Select.Viewport className=' p-2 flex flex-col gap-2 min-w-full'>
                                            <Select.Group>
                                                <Select.Label className='text-zinc-600 mb-1'>Games</Select.Label>
                                                {
                                                    games.map(game => {
                                                        return (
                                                            <Select.Item value={game.id} className='text-zinc-300 flex flex-row gap-2 items-center hover:bg-zinc-700 rounded p-2 cursor-pointer'>
                                                                <Select.ItemText>{game.title}</Select.ItemText>
                                                                <Select.ItemIndicator>
                                                                    <Check className='w-4 h-4 text-zinc-400 ' />
                                                                </Select.ItemIndicator>
                                                            </Select.Item>
                                                        )
                                                    })
                                                }
                                            </Select.Group>
                                        </Select.Viewport>

                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>

                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor='name'>Nome ou Nickname</label>
                            <Input name='name' id='name' placeholder='Como quer ser chamado no game?' />
                        </div>

                        <div className='grid grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold' htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                                <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='Tudo bem ser zero :)' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold' htmlFor='discord'>Discord</label>
                                <Input name='discord' id='discord' placeholder='Usuario#0000?' />
                            </div>
                        </div>

                        <div className='flex gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold' htmlFor='weekDays'>Quando costuma jogar?</label>
                                <ToggleGroup.Root
                                    type='multiple'
                                    className='grid grid-cols-4 gap-2'
                                    value={weekDays}
                                    onValueChange={setWeekDays}>

                                    <ToggleGroup.Item
                                        value='0'
                                        title='Domingo'
                                        className={`w-8 h-8 rounded   ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >D</ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value='1'
                                        title='Segunda'
                                        className={`w-8 h-8 rounded   ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >S</ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value='2'
                                        title='Terça'
                                        className={`w-8 h-8 rounded   ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >T</ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value='3'
                                        title='Quarta'
                                        className={`w-8 h-8 rounded   ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >Q</ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value='4'
                                        title='Quinta'
                                        className={`w-8 h-8 rounded   ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >Q</ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value='5'
                                        title='Sexta'
                                        className={`w-8 h-8 rounded   ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >S</ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value='6'
                                        title='Sabado'
                                        className={`w-8 h-8 rounded   ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                    >S</ToggleGroup.Item>

                                </ToggleGroup.Root>
                            </div>
                            <div className='flex flex-col gap-2 flex-1'>
                                <label className='font-semibold' htmlFor='hourStart'>Qual horário do dia?</label>
                                <div className='grid grid-cols-2 gap-2'>
                                    <Input name='hourStart' id='hourStart' type='time' placeholder='De' />
                                    <Input name='hourEnd' id='hourEnd' type='time' placeholder='Até' />
                                </div>
                            </div>
                        </div>

                        <div className='mt-2 flex gap-2 text-sm items-center'>
                            <Checkbox.Root onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }} id='useVoiceChannel' defaultChecked={useVoiceChannel} className='bg-zinc-900 w-6 h-6 rounded p-1'>
                                <Checkbox.Indicator>
                                    <Check className='w-4 h-4 text-emerald-400 ' />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <label htmlFor='useVoiceChannel'>Costumo me conectar ao chat de voz</label>
                        </div>

                        <footer className='mt-4 flex justify-end gap-4'>
                            <Dialog.Close
                                className='bg-zinc-500 rounded-md px-5 h-12 font-semibold hover:bg-zinc-600'>
                                Cancelar
                            </Dialog.Close>
                            <button
                                type='submit'
                                className='bg-violet-500 rounded-md px-5 h-12 font-semibold flex items-center gap-3 hover:bg-violet-600'>
                                <GameController size={24} />
                                Encontrar Duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Content>
            </Dialog.Overlay>

        </Dialog.Portal >
    )
}